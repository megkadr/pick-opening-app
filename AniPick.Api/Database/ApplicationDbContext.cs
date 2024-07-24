using System.Reflection;
using AniPick.Api.Database.Models;
using Microsoft.EntityFrameworkCore;
namespace AniPick.Api.Database;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{   
    public DbSet<User> Users { get; init; } = default!;
    public DbSet<Opening> Openings { get; init; } = default!;
    
    public DbSet<Claim> Claims { get; init; } = default!;
    public DbSet<UserOpenings> UserOpenings { get; init; } = default!;
    
    public DbSet<UserClaims> UserClaims { get; init; } = default!;
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var assembly = Assembly.GetAssembly(typeof(ApplicationDbContext))!;
        modelBuilder.ApplyConfigurationsFromAssembly(assembly);
    }
}