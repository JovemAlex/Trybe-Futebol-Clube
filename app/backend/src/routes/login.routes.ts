import { Router } from 'express';
import loginValidate from '../middlewares/loginValidate';
import loginController from '../controllers/loginController';

const router = Router();

router.get('/validate', loginController.tokenValidation);
router.post('/', loginValidate, loginController.loginController);

export default router;
