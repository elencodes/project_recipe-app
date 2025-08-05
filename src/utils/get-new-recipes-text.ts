export function getNewRecipesText(count: number): string {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    let suffix: string;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        suffix = 'новых рецептов';
    } else if (lastDigit === 1) {
        suffix = 'новый рецепт';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        suffix = 'новых рецепта';
    } else {
        suffix = 'новых рецептов';
    }

    return `${count} ${suffix}`;
}
