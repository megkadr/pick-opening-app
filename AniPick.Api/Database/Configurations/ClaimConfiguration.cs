using AniPick.Api.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AniPick.Api.Database.Configurations;

public class ClaimConfiguration : IEntityTypeConfiguration<Claim>
{
    public void Configure(EntityTypeBuilder<Claim> claimConfig)
    {
        claimConfig.Property(u => u.Title).IsRequired();
        claimConfig.HasKey(u => u.Id);
        
        claimConfig.HasMany(u => u.UserClaims)
            .WithOne(uo => uo.Claim)
            .HasForeignKey(uo => uo.ClaimId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}