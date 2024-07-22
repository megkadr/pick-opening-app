using AniPick.Api.Database;
using AniPick.Api.Database.Models;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace AniPick.Api.Areas.Users.Services;

public class UsersService(ApplicationDbContext context) : IUsersService
{
    public async Task<(UserOpenings? obj, Exception? error)> AddChosenByUserOpening(UserOpenings model)
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

            return (openingChosenByUser, null);
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
            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.PasswordHash)
            };

            await context.Users.AddAsync(user);
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
            var user = await context.Users.FirstOrDefaultAsync(u => u.Name == login);

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
}