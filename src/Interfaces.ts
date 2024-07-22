export interface Mutable{
    toImmutable(): Immutable;
}

export interface Immutable{
    toMutable(): Mutable;
}