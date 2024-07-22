using AniPick.Api.Database.Models;

namespace AniPick.Api.Areas.Users.Services;

public interface IUsersService
{
    Task<(UserOpenings? obj, Exception? error)> AddChosenByUserOpening(UserOpenings model);
    Task<(User? obj, Exception? error)> AddUser(User model);
    Task<(bool isAuthenticated, User? obj, Exception? error)> VerifyUser(string login, string password);
}