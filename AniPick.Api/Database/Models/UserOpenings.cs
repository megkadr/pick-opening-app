namespace AniPick.Api.Database.Models;

public class UserOpenings : BaseDbEntity<int>
{
    public int UserId { get; init; }
    public int OpeningId { get; init; }
    public int Year { get; init; }
    
    public User User { get; init; } = null!;
    public Opening Opening { get; init; } = null!;
}