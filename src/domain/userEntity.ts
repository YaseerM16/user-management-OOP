export class User {
    private name: string;
    private email: string;
    private phone: number;
    private password: string;

    constructor(name: string, email: string, phone: number, password: string) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    // public getId(): number {
    //     return this.id;
    // }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPhone(): number {
        return this.phone;
    }

    public getPassword(): string {
        return this.password;
    }
}