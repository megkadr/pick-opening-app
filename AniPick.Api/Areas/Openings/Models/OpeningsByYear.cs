namespace AniPick.Api.Areas.Openings.Models;

public class OpeningsByYear
{
    public int Year { get; set; } 
    
    public List<OpeningModel> Openings { get; set; }
}