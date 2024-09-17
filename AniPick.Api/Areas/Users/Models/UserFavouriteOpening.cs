namespace AniPick.Api.Areas.Users.Models;

public class UserFavouriteOpening
{
    public string Name { get; init; }

    public int Year { get; init; }

    public int OpeningNumber { get; init; }
    
    public int OpeningClickCount { get; init; }
}