/**
 * Generates a random alphanumeric short code with the specified length.
 * @param {number} [length=6] - The length of the short code to generate. Defaults to 6 if not provided.
 * @return {string} A randomly generated alphanumeric short code.
 */
function generateShortCode(length: number = 6): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}

export default generateShortCode;