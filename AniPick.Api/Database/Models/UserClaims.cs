namespace AniPick.Api.Database.Models;

public class UserClaims  : BaseDbEntity<int>
{
    public int UserId { get; init; }
    public int ClaimId { get; init; }
    
    public User User { get; init; } = null!;
    public Claim Claim { get; init; } = null!;
}