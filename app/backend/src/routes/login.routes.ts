import { Router } from 'express';
import loginValidate from '../middlewares/loginValidate';
import loginController from '../controllers/loginController';
import TokenValidation from '../utils/tokenValidation';

const tokenValidate = new TokenValidation();

const router = Router();

router.get('/validate', tokenValidate.validation);
router.post('/', loginValidate, loginController.loginController);

export default router;
