namespace AniPick.Api.Areas.Users.Models;

public class AccountDetailsModel
{
    public string Name { get; init; }

    public string FavoriteOpeningName { get; init; }

    public string FavoriteOpeningClickCount { get; init; }
    
    public List<UserFavouriteOpening> UserFavouriteOpenings { get; init; }
}