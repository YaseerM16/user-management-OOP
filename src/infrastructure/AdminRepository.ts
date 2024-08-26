import { Session } from 'express-session';
import { Helper } from '.././application/services/helper';
import { User } from '../domain/userEntity';

interface AdminRepositoryInterface {
    getUsers(): Promise<User[]>;
    deleteUser(id: string): Promise<void>;
    editUser(id: string, name: string, email: string, phone: string): Promise<void>;
    addUser(name: string, email: string, phone: string, password: string, session: Session): Promise<{}>;
    searchUser(search: string): Promise<User[]>;
}

class AdminRepository implements AdminRepositoryInterface {
    private userCollection: any;

    constructor(userCollection: any) {
        this.userCollection = userCollection;
    }

    async getUsers(): Promise<User[]> {
        return await this.userCollection.find();
    }

    async deleteUser(id: string): Promise<void> {
        await this.userCollection.findByIdAndDelete(id);
    }

    async editUser(id: string, name: string, email: string, phone: string): Promise<void> {
        await this.userCollection.findByIdAndUpdate(id, {
            $set: {
                name,
                email,
                phone,
            },
        });
    }

    async addUser(name: string, email: string, phone: string, password: string, session: Session): Promise<{ success: boolean, message: string }> {

        const existingUser = await this.userCollection.findOne({ email });
        if (existingUser) {
            return { success: false, message: "Email already exists !!" }
        } else {
            const hashedPassword = await Helper.hashPassword(password);
            await new this.userCollection({
                name,
                email,
                phone,
                password: hashedPassword,
            }).save();
            return { success: true, message: "" }
        }
    }

    async searchUser(search: string): Promise<User[]> {
        const trimmedSeach = search.trim()
        return await this.userCollection.find({
            name: { $regex: trimmedSeach, $options: "i" },
        });
    }
}

export default AdminRepository;
