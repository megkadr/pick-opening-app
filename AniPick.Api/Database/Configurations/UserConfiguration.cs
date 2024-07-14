using AniPick.Api.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AniPick.Api.Database.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> userConfig)
    {
        userConfig.ToTable(nameof(ApplicationDbContext.Users), "dbo");
        userConfig.HasKey(u => u.Id);
        
        userConfig.HasMany(u => u.UserOpenings)
            .WithOne(uo => uo.User)
            .HasForeignKey(uo => uo.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        userConfig.Property(u => u.Name).IsRequired();
        userConfig.Property(u => u.PasswordHash).IsRequired();
        userConfig.Property(u => u.Email).IsRequired();
        userConfig.HasIndex(u => u.Email).IsUnique();
    }
}