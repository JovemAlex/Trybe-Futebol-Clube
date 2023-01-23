import { Router } from 'express';
import loginValidate from '../middlewares/login.validate';
import LoginController from '../controllers/login.controller';

const router = Router();

router.post('/', loginValidate, LoginController);

export default router;
