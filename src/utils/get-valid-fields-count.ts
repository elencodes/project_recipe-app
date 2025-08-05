export function getValidFieldsCount<TValues extends Record<string, unknown>>(
    values: TValues,
    errors: Partial<Record<keyof TValues, unknown>>,
): number {
    return Object.entries(values).filter(([key, value]) => {
        const typedKey = key as keyof TValues;
        return Boolean(value) && !errors[typedKey];
    }).length;
}
