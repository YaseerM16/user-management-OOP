import AdminRepository from '../infrastructure/AdminRepository';

interface AdminUseCaseInterface {
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

class AdminUseCase implements AdminUseCaseInterface {
    private adminRepository: AdminRepository;

    private getSession(req: any): any {
        return req.session as any
    }

    constructor(adminRepository: AdminRepository) {
        this.adminRepository = adminRepository;
    }

    async getAdminPage(req: any, res: any): Promise<void> {
        if (req.session.adminLoginSession) {
            res.redirect('/adminDashBoard');
        } else {
            res.render('adminPages/adminLoginPage', { notValid: req.session.invalidAdminCreds });
        }
    }

    async adminLogSubmit(req: any, res: any): Promise<void> {
        try {
            const credentials = {
                email: process.env.ADMINEMAIL,
                password: process.env.ADMINPASSWORD,
            };

            if (
                credentials.email === req.body.username &&
                req.body.password === credentials.password
            ) {

                req.session.adminLoginSession = true
                res.redirect('/adminDashBoard');
            } else {
                req.session.invalidAdminCreds = true
                res.redirect('/adminLogin');
            }
        } catch (err) {
            console.log('Error Occur in Admin Log In' + err);
        }
    }

    async adminDashBoard(req: any, res: any): Promise<void> {
        const session = req.session as any;
        if (session.logged) {
            const usersData = await this.adminRepository.getUsers();
            res.render('adminPages/adminDashBoard', { users: usersData });
        } else {
            res.redirect('/adminPage');
        }
    }

    async deleteUser(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            await this.adminRepository.deleteUser(id);
            res.redirect('/adminDashBoard');
        } catch (error) {
            console.log('error in deleting data', error);
        }
    }

    async editUser(req: any, res: any): Promise<void> {
        try {
            const { name, email, phone } = req.body;
            const { id } = req.params;
            await this.adminRepository.editUser(id, name, email, phone);
            res.redirect('/adminDashBoard');
        } catch (error) {
            console.log(error);
        }
    }

    async addUserPage(req: any, res: any): Promise<void> {
        const session = req.session as any;
        if (session.logged) {
            try {
                res.render('adminPages/createUser', {
                    inputErr: session.inputErr,
                    errMsg: session.errorMessage,
                    userExist: session.userExist,
                });
                session.userExist = false;
                session.inputErr = false;
                session.save();
            } catch (error) {
                console.log('error in getting add user page ', error);
            }
        }
    }

    async addUser(req: any, res: any): Promise<void> {
        try {
            const { name, email, phone, password } = req.body;
            await this.adminRepository.addUser(name, email, phone, password, req.session);
            res.redirect('/adminDashBoard');
        } catch (error) {
            console.log('error in adding user', error);
        }
    }

    async searchUser(req: any, res: any): Promise<void> {
        try {
            const { search } = req.body;
            const users = await this.adminRepository.searchUser(search);
            res.render('adminPages/adminDashBoard', { users });
        } catch (error) {
            console.log('error in searching ', error);
        }
    }

    async adminLogout(req: any, res: any): Promise<void> {
        req.session.adminLoginSession = false
        res.redirect('/adminLogin');
    }
}

export default AdminUseCase;