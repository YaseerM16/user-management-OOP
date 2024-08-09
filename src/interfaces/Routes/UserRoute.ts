import express from 'express';
import { UserController } from '../../application/controllers/UserController';
import { UserUseCase } from '../../application/UserUseCase';
import { UserRepositoryImpl } from '../../infrastructure/UserRepository';
import UserModel from '../../infrastructure/UserModel';

const router = express.Router();
const userRepo = new UserRepositoryImpl(UserModel)
const userUseCase = new UserUseCase(userRepo)
const userController = new UserController(userUseCase);

router.get('/', userController.homePage);
router.get('/loginPage', userController.loginPage);
router.get('/signUpPage', userController.signUpPage);
router.post('/signUpSubmit', userController.signUpSubmit);
router.post('/loginSubmit', userController.loginSubmit);
router.get('/logOut', userController.logOut);

export default router;