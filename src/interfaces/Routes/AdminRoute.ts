import express from 'express';
import AdminController from '../../application/controllers/AdminController';
import AdminUseCase from '../../application/AdminUseCase';
import AdminRepository from '../../infrastructure/AdminRepository';
import UserModel from '../../infrastructure/UserModel';
import isAdmin from '../../infrastructure/middleware/adminMiddleware'

const router = express.Router();
const adminRepo = new AdminRepository(UserModel)
const adminUseCase = new AdminUseCase(adminRepo)
const adminController = new AdminController(adminUseCase)

router.get('/adminLogin', adminController.getAdminPage);
router.post('/adminLogSubmit', adminController.adminLogSubmit);
router.get('/adminDashBoard', isAdmin, adminController.adminDashBoard);
router.get('/deleteUser/:id', isAdmin, adminController.deleteUser);
router.post('/editUser/:id', isAdmin, adminController.editUser);
router.get('/addUserPage', isAdmin, adminController.addUserPage);
router.post('/addUser', isAdmin, adminController.addUser);
router.post('/searchUser', isAdmin, adminController.searchUser);
router.get('/adminLogout', adminController.adminLogout);

export default router;