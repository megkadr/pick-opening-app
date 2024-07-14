using System.ComponentModel.DataAnnotations;

namespace AniPick.Api.Database.Models;

public class Opening : BaseDbEntity<int>
{
    [MaxLength(300)]
    public string Title { get; set; } = default!;
    public int OpeningNumber { get; set; } 
    public string Src { get; set; } = default!;
    public int Year { get; set; } 
    
    [MaxLength(150)]
    public string SerieName { get; set; } = default!;
    
    public List<UserOpenings> UserOpenings { get; init; } = [];
}