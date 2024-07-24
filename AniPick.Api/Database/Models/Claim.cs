using System.ComponentModel.DataAnnotations;

namespace AniPick.Api.Database.Models;

public class Claim  : BaseDbEntity<int>
{
    [MaxLength(100)]
    public string Title { get; set; } = default!;
    
    public List<UserClaims> UserClaims { get; init; } = [];
}