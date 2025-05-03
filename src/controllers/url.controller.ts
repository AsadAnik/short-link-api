import { Request, Response, NextFunction } from 'express';
import { UrlService } from '../services';
import { UrlValidation } from '../utils/validation';


class UrlController {
    private readonly urlService: UrlService;

    constructor(urlService: UrlService = new UrlService()) {
        this.urlService = urlService;
    }

    /**
     * Handles the URL shortening request.
     *
     * @param {Request} req - The HTTP request object containing client request details.
     * @param {Response} res - The HTTP response object used to send back the appropriate response.
     * @param {NextFunction} _next - The next middleware function in the application's middleware stack.
     */
    public shortenUrl = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
        try {
            const { originalUrl } = req.body;
            if (!originalUrl) throw new Error(`Original URL is required`);

            // Shorten-URL from Service Method
            const shortenUrl = await this.urlService.ShortenUrl({ originalLink: originalUrl });

            res.status(200).json({
                success: true,
                message: 'Successfully Shorted',
                data: shortenUrl,
            });

        } catch (error) {
            res.json({ success: false, error });
        }
    }

    /**
     * Handles redirection to the original URL by sending a success response.
     *
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @param {NextFunction} _next - The next middleware function in the stack (unused).
     */
    public redirectToOriginalUrl = async (req: Request, res: Response | any, _next: NextFunction) => {
        try {
            // Validate Params Data as Request-Validation
            const parsedParams = UrlValidation.redirectUrl.safeParse(req.params);
            if (!parsedParams.success) return res.status(400).json({ error: parsedParams.error.errors });

            const shortCode = parsedParams.data.shortcode;
            if (!shortCode) throw new Error(`Short Code is required`);

            // RedirectToOriginal Link from Service Method
            const originalLink: string = await this.urlService.redirectToOriginalLink({ shortLink: shortCode });

            res.status(200).json({
                success: true,
                message: 'Successfully Shorted',
                data: originalLink,
            });

        } catch (error) {
            res.json({ success: false, error });
        }
    }
}

export default UrlController;