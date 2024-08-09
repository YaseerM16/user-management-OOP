import { Request, Response } from 'express';
import AdminUseCase from '../AdminUseCase';

interface AdminControllerInterface {
    getAdminPage(req: Request, res: Response): Promise<void>;
    adminLogSubmit(req: Request, res: Response): Promise<void>;
    adminDashBoard(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
    editUser(req: Request, res: Response): Promise<void>;
    addUserPage(req: Request, res: Response): Promise<void>;
    addUser(req: Request, res: Response): Promise<void>;
    searchUser(req: Request, res: Response): Promise<void>;
    adminLogout(req: Request, res: Response): Promise<void>;
}

class AdminController implements AdminControllerInterface {
    private adminUseCase: AdminUseCase;

    constructor(adminUseCase: AdminUseCase) {
        this.adminUseCase = adminUseCase;
        this.getAdminPage = this.getAdminPage.bind(this)
        this.adminLogSubmit = this.adminLogSubmit.bind(this)
        this.adminDashBoard = this.adminDashBoard.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.editUser = this.editUser.bind(this)
        this.addUserPage = this.addUserPage.bind(this)
        this.addUser = this.addUser.bind(this)
        this.searchUser = this.searchUser.bind(this)
        this.adminLogout = this.adminLogout.bind(this)
    }

    async getAdminPage(req: Request, res: Response): Promise<void> {
        await this.adminUseCase.getAdminPage(req, res);
    }

    async adminLogSubmit(req: any, res: any): Promise<void> {
        await this.adminUseCase.adminLogSubmit(req, res);
    }

    async adminDashBoard(req: any, res: any): Promise<void> {
        await this.adminUseCase.adminDashBoard(req, res);
    }

    async deleteUser(req: any, res: any): Promise<void> {
        await this.adminUseCase.deleteUser(req, res);
    }

    async editUser(req: any, res: any): Promise<void> {
        await this.adminUseCase.editUser(req, res);
    }

    async addUserPage(req: any, res: any): Promise<void> {
        await this.adminUseCase.addUserPage(req, res);
    }

    async addUser(req: any, res: any): Promise<void> {
        await this.adminUseCase.addUser(req, res);
    }

    async searchUser(req: any, res: any): Promise<void> {
        await this.adminUseCase.searchUser(req, res);
    }

    async adminLogout(req: any, res: any): Promise<void> {
        await this.adminUseCase.adminLogout(req, res);
    }
}

export default AdminController;