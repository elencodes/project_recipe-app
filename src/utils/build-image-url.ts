export function buildImageUrl(relativePath?: string): string {
    const baseUrl = import.meta.env.VITE_API_IMG_URL;
    if (!baseUrl) {
        throw new Error('VITE_API_IMG_URL is not defined in environment variables.');
    }
    return `${baseUrl}/${relativePath}`;
}
