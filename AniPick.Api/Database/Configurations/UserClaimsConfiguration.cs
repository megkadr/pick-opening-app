using AniPick.Api.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AniPick.Api.Database.Configurations;

public class UserClaimsConfiguration : IEntityTypeConfiguration<UserClaims>
{
    public void Configure(EntityTypeBuilder<UserClaims> userClaimsConfig)
    {
        userClaimsConfig.HasKey(uo => uo.Id);
        
        userClaimsConfig.Property(uo => uo.UserId).IsRequired();
        userClaimsConfig.Property(uo => uo.ClaimId).IsRequired();
        userClaimsConfig.HasIndex(uo => new { uo.UserId, uo.ClaimId }).IsUnique();
        
        userClaimsConfig.HasOne(uo => uo.User)
            .WithMany(u => u.UserClaims)
            .HasForeignKey(uo => uo.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        userClaimsConfig.HasOne(uo => uo.Claim)
            .WithMany(o => o.UserClaims)
            .HasForeignKey(uo => uo.ClaimId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}