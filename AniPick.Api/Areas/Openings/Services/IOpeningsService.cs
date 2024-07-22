using AniPick.Api.Database.Models;

namespace AniPick.Api.Areas.Openings.Services;

public interface IOpeningsService
{
    Task<List<Opening>> GetRandomOpeningsByYear(int year);
    Task<(Opening? obj, Exception? error)> AddOpening(Opening model);
}