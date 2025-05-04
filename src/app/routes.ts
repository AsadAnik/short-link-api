import { Router, Request, Response, NextFunction } from 'express';
import { authRoutes, urlRoutes } from '../routes';
import { UrlController } from '../controllers';
// import { AuthMiddleware } from '../middlewares';

const router: Router = Router();
const urlController = new UrlController();

/**
 * ---- Routes For API Version 01 -----
 * All required routes root
 */
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/url', urlRoutes);
router.get('/:shortcode', urlController.redirectToOriginalUrl);

/**
 * ---- Health Check for the application here ----
 * Checking for Health of application at very first time
 */
router.get('/health', (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        message: 'Successful',
        data: {
            message: 'Server is up and running...'
        }
    });
});

export default router;