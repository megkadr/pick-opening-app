IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'AniPickTestDb')
    BEGIN
        CREATE DATABASE AniPickTestDb;
    END;
GO