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
exports.UserController = void 0;
class UserController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
        this.loginPage = this.loginPage.bind(this);
        this.homePage = this.homePage.bind(this);
        this.signUpPage = this.signUpPage.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    loginPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userUseCase.loginPage(req, res);
        });
    }
    homePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userUseCase.homePage(req, res);
        });
    }
    signUpPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userUseCase.signUpPage(req, res);
        });
    }
    signUpSubmit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userUseCase.signUpSubmit(req, res);
        });
    }
    loginSubmit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userUseCase.loginSubmit(req, res);
        });
    }
    logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userUseCase.logOut(req, res);
        });
    }
}
exports.UserController = UserController;
