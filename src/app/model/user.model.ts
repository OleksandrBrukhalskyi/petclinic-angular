export class User{
    id: any;
    login: string;
    password: string;
    role: string;
    token?: string;

    constructor(login: string, password: string){
        this.login = login;
        this.password = password;
        
    }
}