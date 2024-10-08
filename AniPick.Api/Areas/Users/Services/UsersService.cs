﻿using System.Net;
using AniPick.Api.Areas.Users.Models;
using AniPick.Api.Database;
using AniPick.Api.Database.Models;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace AniPick.Api.Areas.Users.Services;

public class UsersService(ApplicationDbContext context) : IUsersService
{
    public async Task<(AddOpeningModel? obj, Exception? error)> AddChosenByUserOpening(AddOpeningModel model)
    {
        try
        {
            var openingChosenByUser = new UserOpenings
            {
                UserId = model.UserId,
                OpeningId = model.OpeningId,
                Year = model.Year,
            };

            await context.UserOpenings.AddAsync(openingChosenByUser);
            await context.SaveChangesAsync();

            return (model, null);
        }
        catch (Exception ex)
        {
            return (null, ex);
        }
    }
    
    public async Task<(User? obj, Exception? error)> AddUser(User model)
    {
        try
        {
            var isExist = await context.Users.FirstOrDefaultAsync(x=> x.Name == model.Name || x.Email == model.Email);
            if (isExist!= null)
            {
                return (null, new Exception("User with the same name or email already exists."));
            }
            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.PasswordHash),
            };

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            // Get the ID of the newly added user
            var newUserId = user.Id;

            // Add UserClaims record with the new user ID
            var userClaim = new UserClaims
            {
                UserId = newUserId,
                ClaimId = 3
            };

            await context.UserClaims.AddAsync(userClaim);
            await context.SaveChangesAsync();

            return (user, null);
        }
        catch (Exception ex)
        {
            return (null, ex);
        }
    }
    
    public async Task<(bool isAuthenticated, User? obj, Exception? error)> VerifyUser(string login, string password)
    {
        try
        {
            var user = await context.Users
                .AsNoTracking()
                .Include(u => u.UserClaims)
                .FirstOrDefaultAsync(u => u.Name == login);

            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return (true, user, null);
            }
        }
        catch (Exception ex)
        {
            return (false, null, ex);
        }

        return (false, null, null);
    }
    
    public async Task<(HttpStatusCode statusCode, Exception? error)> RemoveUser(int userId)
    {
        try
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user != null)
            {
                context.Users.Remove(user);
                await context.SaveChangesAsync();
                return (HttpStatusCode.OK, null);
            }
            else
            {
                return (HttpStatusCode.NotFound, new Exception("User not found"));
            }
        }
        catch (Exception ex)
        {
            return (HttpStatusCode.InternalServerError, ex);
        }
    }
    
    public async Task<(HttpStatusCode statusCode, Exception? error)> ChangePassword(int userId, string newPassword)
    {
        try
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return (HttpStatusCode.NotFound, new Exception("User not found"));
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await context.SaveChangesAsync();
            return (HttpStatusCode.OK, null);
        }
        catch (Exception ex)
        {
            return (HttpStatusCode.InternalServerError, ex);
        }
    }
    public async Task<(AccountDetailsModel? obj, Exception? error)> GetUserAccountDetails(int userId)
    {
        try
        {
            var user = await context.Users
                .AsNoTracking()
                .Include(u => u.UserOpenings)
                .ThenInclude(uo => uo.Opening)
                .FirstOrDefaultAsync(u => u.Id == userId);
            
            var userOpeningsGrouped = user?.UserOpenings
                .GroupBy(uo => uo.Year)
                .ToDictionary(g => g.Key, g => g.ToList());

            var userFavouriteOpenings = new List<UserFavouriteOpening>();

            if (userOpeningsGrouped != null)
                foreach (var yearGroup in userOpeningsGrouped)
                {
                    var mostClickedOpening = yearGroup.Value
                        .GroupBy(uo => uo.OpeningId)
                        .Select(g => new
                        {
                            Opening = g.First().Opening,
                            ClickCount = g.Count()
                        }).MaxBy(x => x.ClickCount);

                    if (mostClickedOpening != null)
                    {
                        userFavouriteOpenings.Add(new UserFavouriteOpening
                        {
                            Name = mostClickedOpening.Opening.Title,
                            Year = yearGroup.Key,
                            OpeningNumber = mostClickedOpening.Opening.OpeningNumber,
                            OpeningClickCount = mostClickedOpening.ClickCount
                        });
                    }
                }

            var favoriteOpening = userFavouriteOpenings.MaxBy(uo => uo.OpeningClickCount);

            var userAccountDetails = new AccountDetailsModel()
            {
                Name = user?.Name,
                FavoriteOpeningName = favoriteOpening?.Name ?? string.Empty,
                FavoriteOpeningClickCount = favoriteOpening?.OpeningClickCount.ToString() ?? "0",
                UserFavouriteOpenings = userFavouriteOpenings
            };
            
            return (userAccountDetails, null);
        }
        catch (Exception ex)
        {
            return (null, ex);
        }
    }
    
    public async Task<(bool isSuccess, Exception? error)> ChangePassword(int userId, string currentPassword, string newPassword)
    {
        try
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user != null && BCrypt.Net.BCrypt.Verify(currentPassword, user.PasswordHash))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
                await context.SaveChangesAsync();
                return (true, null);
            }
        }
        catch (Exception ex)
        {
            return (false, ex);
        }

        return (false, null);
    }
}