using AniPick.Api.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AniPick.Api.Database.Configurations;

public class UserOpeningsConfiguration : IEntityTypeConfiguration<UserOpenings>
{
    public void Configure(EntityTypeBuilder<UserOpenings> userOpeningsConfig)
    {
        userOpeningsConfig.HasKey(uo => uo.Id);
        
        userOpeningsConfig.Property(uo => uo.Year).IsRequired();
        userOpeningsConfig.HasIndex(uo => new { uo.UserId, uo.Year }).IsUnique();
        
        userOpeningsConfig.HasOne(uo => uo.User)
            .WithMany(u => u.UserOpenings)
            .HasForeignKey(uo => uo.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        userOpeningsConfig.HasOne(uo => uo.Opening)
            .WithMany(o => o.UserOpenings)
            .HasForeignKey(uo => uo.OpeningId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}