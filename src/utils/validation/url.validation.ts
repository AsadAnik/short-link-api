import { z } from 'zod';

class UrlValidation {
    /**
     * Schema definition for the `shortenUrl` object.
     * This schema validates the structure of a URL-shortening request.
     *
     * Properties:
     * - `originalUrl` (string): Represents the original URL to be shortened.
     *    - Required field. If not provided, it will throw a 'Original URL is required' error.
     *    - Must be a string. If the type is invalid, it will throw a 'Original URL must be a string' error.
     *    - Must follow a valid URL format. If the format is invalid, it will throw an 'Invalid URL format' error.
     */
    // region Shorten-Link
    static shortenUrl = z.object({
        originalUrl: z.string({
            required_error: 'Original URL is required',
            invalid_type_error: 'Original URL must be a string'
        }).url('Invalid URL format'),
    });

    /**
     * Represents a validation schema for a redirect URL using Zod.
     *
     * The schema validates the `shortCode` property with the following constraints:
     * - It is a required field. An error message "shortCode is required" is displayed if the field is missing.
     * - The `shortCode` must be at least 4 characters long, with an error message "shortCode must be at least 4 characters."
     * - The `shortCode` must be at most 10 characters long, with an error message "shortCode must be at most 10 characters."
     * - The `shortCode` must be an alphanumeric string. If it contains non-alphanumeric characters, an error message "shortCode must be alphanumeric" is displayed.
     */
    // region Redirect-Link
    static redirectUrl = z.object({
        shortcode: z.string({
                required_error: 'shortCode is required',
            })
            .min(4, 'shortCode must be at least 4 characters')
            .max(10, 'shortCode must be at most 10 characters')
            .regex(/^[a-zA-Z0-9]+$/, 'shortCode must be alphanumeric'),
    });
}

export default UrlValidation;