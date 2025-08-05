export function cleanEmptyStrings<T extends Record<string, unknown>>(obj: T): T {
    const cleaned = {} as Record<keyof T, unknown>;

    for (const key in obj) {
        const value = obj[key];

        if (typeof value === 'string') {
            const trimmed = value.trim();
            if ((key === 'time' || key === 'portions') && trimmed !== '') {
                const parsed = Number(trimmed);
                cleaned[key] = isNaN(parsed) ? null : parsed;
            } else {
                cleaned[key] = trimmed === '' ? null : trimmed;
            }
        } else if (Array.isArray(value)) {
            cleaned[key] = value.map((item) =>
                typeof item === 'object' && item !== null
                    ? cleanEmptyStrings(item as Record<string, unknown>)
                    : item,
            );
        } else if (typeof value === 'object' && value !== null) {
            cleaned[key] = cleanEmptyStrings(value as Record<string, unknown>);
        } else {
            cleaned[key] = value;
        }
    }

    return cleaned as T;
}
