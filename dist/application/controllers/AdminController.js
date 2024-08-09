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
class AdminController {
    constructor(adminUseCase) {
        this.adminUseCase = adminUseCase;
        this.getAdminPage = this.getAdminPage.bind(this);
        this.adminLogSubmit = this.adminLogSubmit.bind(this);
        this.adminDashBoard = this.adminDashBoard.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUserPage = this.addUserPage.bind(this);
        this.addUser = this.addUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.adminLogout = this.adminLogout.bind(this);
    }
    getAdminPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.getAdminPage(req, res);
        });
    }
    adminLogSubmit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.adminLogSubmit(req, res);
        });
    }
    adminDashBoard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.adminDashBoard(req, res);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.deleteUser(req, res);
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.editUser(req, res);
        });
    }
    addUserPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.addUserPage(req, res);
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.addUser(req, res);
        });
    }
    searchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.searchUser(req, res);
        });
    }
    adminLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adminUseCase.adminLogout(req, res);
        });
    }
}
exports.default = AdminController;
