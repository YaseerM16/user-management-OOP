import { User } from '../domain/userEntity';

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
}

export class UserRepositoryImpl implements UserRepository {
    private userModel: any; // assume this is a MongoDB model or any other database model

    constructor(userModel: any) {
        this.userModel = userModel;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email });
        return user ? new User(user.name, user.email, user.phone, user.password) : null;
    }

    public async save(user: User): Promise<void> {
        await this.userModel.create(user);
    }
}