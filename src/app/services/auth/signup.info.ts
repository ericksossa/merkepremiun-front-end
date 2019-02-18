export class SignUpInfo {
    name: string;
    identification: string;
    username: string;
    email: string;
    roles: string[];
    password: string;
    adress: string;
    telephone: string;
    city: string;
    numberid: string;

    constructor(name: string, identification: string, username: string, email: string,
        password: string, adress: string, city: string, telephone: string,
    ) {
        this.name = name;
        this.identification = identification;
        this.username = username;
        this.email = email;
        this.password = password;
        this.adress = adress;
        this.city = city;
        this.telephone = telephone;
        this.roles = ['CLIENTE'];
    }
}
