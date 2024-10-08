﻿using AniPick.Api.Areas.Openings.Models;
using AniPick.Api.Database;
using AniPick.Api.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace AniPick.Api.Areas.Openings.Services;

public class OpeningsService(ApplicationDbContext context) : IOpeningsService
{
    public async Task<List<Opening>> GetRandomOpeningsByYear(int year)
    {
        var openings = await context.Openings
            .AsNoTracking()
            .Where(o => o.Year == year)
            .OrderBy(o => EF.Functions.Random())
            .Take(6)
            .ToListAsync();
        return openings;
    }
    
    public async Task<(OpeningModel? obj, Exception? error)> AddOpening(OpeningModel model)
    {
        try
        {
            var opening = new Opening
            {
                Title = model.Title.Trim(),
                OpeningNumber = model.OpeningNumber,
                Src = model.Src.Trim(),
                Year = model.Year,
                SerieName = model.SerieName.Trim()
            };

            await context.Openings.AddAsync(opening);
            await context.SaveChangesAsync();

            return (model, null);
        }
        catch (Exception ex)
        {
            return (null, ex);
        }
    }
    
    public async Task<List<OpeningsByYear>> GetAllOpeningsByYear()
    {
        var openings = await context.Openings
            .AsNoTracking()
            .OrderBy(o => o.Year)
            .ToListAsync();

        var groupedOpenings = openings.GroupBy(o => o.Year)
            .Select(g => new OpeningsByYear
            {
                Year = g.Key,
                Openings = g.Select(o => new OpeningModel
                {
                    Title = o.Title.Trim(),
                    OpeningNumber = o.OpeningNumber,
                    Src = o.Src.Trim(),
                    Year = o.Year,
                    SerieName = o.SerieName.Trim()
                }).ToList()
            }).ToList();

        return groupedOpenings;
    }
}