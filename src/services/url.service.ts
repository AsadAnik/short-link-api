import PrismaClient from '../prisma';
import { generateShortCode } from '../utils/common';
import { IShortenLink, IRedirectToOriginalLink } from '../types/link.types';

class AuthService {
    private BASE_URL: string = process.env.BASE_URL || 'http://localhost:3000';

    /**
     * Shortens the given original URL by generating a unique short code and saving it to the database.
     *
     * @param {Object} params - The input parameter object.
     * @param {string} params.originalLink - The original URL that needs to be shortened.
     * @return {Promise<any>} A promise that resolves with the newly created link entry, including the short URL and original URL.
     */
    // region Shorten-URL Service
    public async ShortenUrl({ originalLink }: IShortenLink): Promise<any> {
        try {
            const urlShorted: string = generateShortCode();
            const shortLink: string = `${this.BASE_URL}/${urlShorted}`;

            const result = await PrismaClient.link.create({
                data: {
                    original: originalLink,
                    short: urlShorted,
                }
            });
            if (!result) throw new Error(`Error while creating user : ${result}`);

            return { ...result, shortLink };

        } catch (error) {
            console.error(`Error to login user: ${error}`);
            throw error;
        }
    }

    /**
     * Redirects to the original link associated with the provided short link.
     * This method takes a short link identifier and attempts to retrieve and redirect to the corresponding original link.
     *
     * @param {Object} param0 - The parameter object containing the short link.
     * @param {string} param0.shortLink - The unique short link identifier to lookup.
     * @return {Promise<any>} A promise that resolves when the redirection logic is completed,
     *                        or rejects if the short link is invalid or the process fails.
     */
    // region Redirect-URL Service
    public async redirectToOriginalLink({ shortLink }: IRedirectToOriginalLink): Promise<string> {
        try {
            const found = await PrismaClient.link.findUnique({ where: { short: shortLink } });
            if (!found) throw new Error(`Link not found for short link: ${shortLink}`);

            // Increment the visited link counts
            await PrismaClient.link.update({
                where: { short: shortLink },
                data: { clicks: { increment: 1} }
            });

            return found.original;

        } catch (error) {
            console.error(`Error to login user: ${error}`);
            throw error;
        }
    }
}

export default AuthService;