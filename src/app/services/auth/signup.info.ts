export class SignUpInfo {
    name: string;
    username: string;
    email: string;
    roles: string[];
    password: string;
    adress: string;
    telephone: string;
    city: string;
    numberid: string;

    constructor(name: string, username: string, email: string,
                password: string, adress: string, city: string, telephone: string,
    ) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.adress = adress;
        this.city = city;
        this.telephone = telephone;
        this.roles = ['CLIENTE'];
    }
}
