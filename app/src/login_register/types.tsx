export type Message = {
    text: string|undefined;
    value: boolean|undefined;
};
export type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeat: string;
    address: Adress;
};
export type LoginData = {
    email: string;
    password: string;
};
export type Adress = {
    street: string;
    city: string;
    zipCode: string;
}