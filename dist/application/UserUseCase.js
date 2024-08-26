"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const userEntity_1 = require("../domain/userEntity");
const helper_1 = require("./services/helper");
class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    loginPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.adminLoginSession) {
                res.redirect('/adminDashBoard');
            }
            else {
                if (req.session.isLogin) {
                    res.redirect('/');
                }
                else {
                    console.log("Getting login page :");
                    res.render("userPages/loginPage", { notValid: req.session.notValid });
                }
            }
        });
    }
    homePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.adminLoginSession) {
                res.redirect('/adminDashBoard');
            }
            else {
                if (req.session.isLogin) {
                    res.render("userPages/homePage", { userDetails: req.session.userDetails });
                }
                else {
                    res.render("userPages/signupPage", { userExist: req.session.userExist });
                }
            }
        });
    }
    signUpPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.adminLoginSession) {
                res.redirect('/adminDashBoard');
            }
            else {
                if (req.session.isLogin) {
                    res.redirect("/");
                }
                else {
                    res.render("userPages/signupPage", {
                        userExist: req.session.userExist,
                    });
                    req.session.userExist = false;
                }
            }
        });
    }
    signUpSubmit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, password } = req.body;
                const user = yield this.signUp(name, email, phone, password);
                if (user.error !== null) {
                    req.session.userExist = true;
                    res.redirect("/signUpPage");
                }
                else {
                    req.session.isLogin = true;
                    req.session.userDetails = user;
                    res.redirect("/");
                }
            }
            catch (err) {
                console.log(`Error in SignUp Registering : ${err}`);
            }
        });
    }
    loginSubmit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.login(email, password);
                if (user.error !== null) {
                    if (user.error === 'invalidCredentials') {
                        req.session.notValid = 'invalidCredentials';
                    }
                    else if (user.error === 'invalidPassword') {
                        req.session.notValid = 'invalidPassword';
                    }
                    res.redirect("/loginPage");
                }
                else {
                    req.session.isLogin = true;
                    req.session.userDetails = user;
                    res.redirect("/");
                }
            }
            catch (err) {
                console.log("Error in LogIn" + err);
            }
        });
    }
    logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.isLogin = false;
            res.redirect("/");
        });
    }
    signUp(name, email, phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findByEmail(email);
            if (existingUser) {
                return { user: null, error: 'userExist' };
            }
            const hashedPassword = yield helper_1.Helper.hashPassword(password);
            const user = new userEntity_1.User(name, email, phone, hashedPassword);
            yield this.userRepository.save(user);
            return { user: user, error: null };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user || user == null) {
                return { user: null, error: 'invalidCredentials' };
            }
            const passwordMatch = yield helper_1.Helper.comparePassword(password, user.getPassword());
            if (!passwordMatch) {
                return { user: null, error: 'invalidPassword' };
            }
            return { user, error: null };
        });
    }
}
exports.UserUseCase = UserUseCase;
