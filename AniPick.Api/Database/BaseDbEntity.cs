namespace AniPick.Api.Database;

public class BaseDbEntity<T> where T : struct
{
    public T Id { get; init; } = default!;
}