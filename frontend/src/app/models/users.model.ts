export class Users {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public userType: string;
    public contact: number;
    public address: string;
    constructor(id: number, name: string, email: string, password: string, userType: string, contact: number, address: string,) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.contact = contact;
        this.address = address;
    }
}