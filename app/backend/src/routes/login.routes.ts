import { Router } from 'express';
import loginValidate from '../middlewares/loginValidate';
import loginController from '../controllers/loginController';
import tokenValidation from '../utils/tokenValidation';

const router = Router();

router.get('/validate', tokenValidation.tokenValidation);
router.post('/', loginValidate, loginController.loginController);

export default router;
