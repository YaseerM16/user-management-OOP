import bcrypt from 'bcrypt'
export class Helper {

    public static emailValidate(email: string): boolean {
        // implement email validation logic here
        return false
    }

    public static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // adjust the cost factor as needed
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }


    public static async comparePassword(password: string, hash: string): Promise<boolean> {
        // implement password comparison logic here
        return await bcrypt.compare(password, hash);

    }
}