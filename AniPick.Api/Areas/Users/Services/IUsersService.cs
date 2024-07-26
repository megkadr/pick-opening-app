using AniPick.Api.Database.Models;
using System.Net;
using AniPick.Api.Areas.Users.Models;

namespace AniPick.Api.Areas.Users.Services;

public interface IUsersService
{
    Task<(AddOpeningModel? obj, Exception? error)> AddChosenByUserOpening(AddOpeningModel model);
    Task<(User? obj, Exception? error)> AddUser(User model);
    Task<(bool isAuthenticated, User? obj, Exception? error)> VerifyUser(string login, string password);
    Task<(HttpStatusCode statusCode, Exception? error)> RemoveUser(int userId);
    Task<(HttpStatusCode statusCode, Exception? error)> ChangePassword(int userId, string newPassword);
}