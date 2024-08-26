import { User } from '../domain/userEntity';
import { UserRepository } from '../infrastructure/UserRepository';
import { Helper } from './services/helper'

export class UserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async loginPage(req: any, res: any) {

        if (req.session.adminLoginSession) {
            res.redirect('/adminDashBoard');
        } else {
            if (req.session.isLogin) {
                res.redirect('/')
            } else {
                console.log("Getting login page :");
                res.render("userPages/loginPage", { notValid: req.session.notValid });
            }
        }

    }

    public async homePage(req: any, res: any) {
        if (req.session.adminLoginSession) {
            res.redirect('/adminDashBoard');
        } else {
            if (req.session.isLogin) {
                res.render("userPages/homePage", { userDetails: req.session.userDetails });
            } else {
                res.render("userPages/signupPage", { userExist: req.session.userExist });
            }
        }
    }


    public async signUpPage(req: any, res: any) {
        if (req.session.adminLoginSession) {
            res.redirect('/adminDashBoard');
        } else {
            if (req.session.isLogin) {
                res.redirect("/")
            } else {
                res.render("userPages/signupPage", {
                    userExist: req.session.userExist,
                });
                req.session.userExist = false;
            }
        }
    }


    public async signUpSubmit(req: any, res: any) {
        try {
            const { name, email, phone, password } = req.body;

            const user = await this.signUp(name, email, phone, password);
            if (user.error !== null) {
                req.session.userExist = true;
                res.redirect("/signUpPage")
            } else {
                req.session.isLogin = true;
                req.session.userDetails = user;
                res.redirect("/");
            }

        } catch (err) {
            console.log(`Error in SignUp Registering : ${err}`);
        }
    }


    public async loginSubmit(req: any, res: any) {
        try {
            const { email, password } = req.body;
            const user = await this.login(email, password);
            if (user.error !== null) {
                if (user.error === 'invalidCredentials') {
                    req.session.notValid = 'invalidCredentials';
                } else if (user.error === 'invalidPassword') {
                    req.session.notValid = 'invalidPassword';
                }
                res.redirect("/loginPage")
            } else {
                req.session.isLogin = true;
                req.session.userDetails = user;
                res.redirect("/");
            }
        } catch (err) {
            console.log("Error in LogIn" + err);
        }
    }


    public async logOut(req: any, res: any) {
        req.session.isLogin = false;
        res.redirect("/");
    }

    public async signUp(name: string, email: string, phone: number, password: string): Promise<{ user: User | null, error: string | null }> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            return { user: null, error: 'userExist' };
        }
        const hashedPassword = await Helper.hashPassword(password)
        const user = new User(name, email, phone, hashedPassword);
        await this.userRepository.save(user);
        return { user: user, error: null };
    }

    public async login(email: string, password: string): Promise<{ user: User | null, error: string | null }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || user == null) {
            return { user: null, error: 'invalidCredentials' };
        }
        const passwordMatch = await Helper.comparePassword(password, user.getPassword());
        if (!passwordMatch) {
            return { user: null, error: 'invalidPassword' };
        }
        return { user, error: null };
    }
}