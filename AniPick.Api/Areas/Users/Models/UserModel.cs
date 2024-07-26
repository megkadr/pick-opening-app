namespace AniPick.Api.Areas.Users.Models;

public class UserModel
{
    public string Name { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public string Email { get; set; } = default!;
}