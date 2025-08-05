export const arrayHasItems = <T>(array?: T[] | null): array is T[] =>
    Array.isArray(array) && array.length > 0;
