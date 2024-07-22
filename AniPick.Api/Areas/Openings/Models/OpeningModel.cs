namespace AniPick.Api.Areas.Openings.Models;

public class OpeningModel
{
    public string Title { get; set; } = default!;
    public int OpeningNumber { get; set; } 
    public string Src { get; set; } = default!;
    public int Year { get; set; } 
    public string SerieName { get; set; } = default!;
}