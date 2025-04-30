import { Router, Request, Response, NextFunction } from 'express';
import { authRoutes } from '../routes';
// import { AuthMiddleware } from '../middlewares';

const router: Router = Router();

/**
 * ---- Routes For API Version 01 -----
 * Now moved API Rutes from /api/v1/ to /api/
 */
router.use('/api/v1/auth', authRoutes);
// router.use('/api/v1/users', AuthMiddleware.verifyUser, userRoutes);

/**
 * ---- Health Check for the application here ----
 * Checking for Health of application at very first time..
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