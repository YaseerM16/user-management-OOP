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
const helper_1 = require(".././application/services/helper");
class AdminRepository {
    constructor(userCollection) {
        this.userCollection = userCollection;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userCollection.find();
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userCollection.findByIdAndDelete(id);
        });
    }
    editUser(id, name, email, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userCollection.findByIdAndUpdate(id, {
                $set: {
                    name,
                    email,
                    phone,
                },
            });
        });
    }
    addUser(name, email, phone, password, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userCollection.findOne({ email });
            if (existingUser) {
                return { success: false, message: "Email already exists !!" };
            }
            else {
                const hashedPassword = yield helper_1.Helper.hashPassword(password);
                yield new this.userCollection({
                    name,
                    email,
                    phone,
                    password: hashedPassword,
                }).save();
                return { success: true, message: "" };
            }
        });
    }
    searchUser(search) {
        return __awaiter(this, void 0, void 0, function* () {
            const trimmedSeach = search.trim();
            return yield this.userCollection.find({
                name: { $regex: trimmedSeach, $options: "i" },
            });
        });
    }
}
exports.default = AdminRepository;
