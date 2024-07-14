using System.ComponentModel.DataAnnotations;

namespace AniPick.Api.Database.Models;

public class User : BaseDbEntity<int>
{
    [MaxLength(150)]
    public string Name { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    
    [MaxLength(320)]
    public string Email { get; set; } = default!;
    
    public List<UserOpenings> UserOpenings { get; init; } = [];
}