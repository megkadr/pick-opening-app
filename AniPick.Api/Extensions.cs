using AniPick.Api.Database;
using AniPick.Api.Database.Configurations;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace AniPick.Api;

public static class Extensions
{
    public static IServiceCollection AddCore(this IServiceCollection services, IConfiguration configuration)
    {
        var databaseCredentials = new DatabaseCredentials
        {
            ConnectionString = configuration.GetConnectionString("Database")!
        };

        services.AddCore(databaseCredentials);

        return services;
    }

    public static IServiceCollection AddCore(this IServiceCollection services, DatabaseCredentials databaseCredentials)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(databaseCredentials.ConnectionString);
        });

        return services;
    }
}