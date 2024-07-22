using AniPick.Api.Areas.Openings.Models;
using AniPick.Api.Database.Models;

namespace AniPick.Api.Areas.Openings.Services;

public interface IOpeningsService
{
    Task<List<Opening>> GetRandomOpeningsByYear(int year);
    Task<(OpeningModel? obj, Exception? error)> AddOpening(OpeningModel model);
}