using AniPick.Api.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AniPick.Api.Database.Configurations;

public class OpeningConfiguration : IEntityTypeConfiguration<Opening>
{
    public void Configure(EntityTypeBuilder<Opening> openingConfig)
    {
        openingConfig.Property(u => u.Title).IsRequired();
        openingConfig.Property(u => u.OpeningNumber).IsRequired();
        openingConfig.Property(u => u.Src).IsRequired();
        openingConfig.Property(u => u.Year).IsRequired();
        openingConfig.Property(u => u.SerieName).IsRequired();
        
        openingConfig.HasKey(u => u.Id);
        
        openingConfig.HasMany(u => u.UserOpenings)
            .WithOne(uo => uo.Opening)
            .HasForeignKey(uo => uo.OpeningId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}