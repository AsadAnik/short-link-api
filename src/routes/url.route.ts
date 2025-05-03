import express from 'express';
import { validationReq } from '../middlewares';
import { UrlValidation } from '../utils/validation';
import { UrlController } from '../controllers';

const router = express.Router();

// Object instance for AuthController Class
const urlController = new UrlController();

// URL Routes
router.post('/shorten', validationReq(UrlValidation.shortenUrl), urlController.shortenUrl);
router.get('/:shortcode', urlController.redirectToOriginalUrl);

export default router;