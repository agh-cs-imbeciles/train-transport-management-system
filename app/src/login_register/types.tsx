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
    street: Street;
    city: string;
    zipCode: string;
}
export type Street = {
    name: string,
    houseNumber: number,
    apartamentNumber: number
}