export type ComicInfo = {
    img: string,
    price: number,
    title: string,
}

export type Register = {
    usuario:string
    apellido: string,
    email: string,
}

export type Delivery = {
    direccion: string,
    departamento: string,
    ciudad: string,
    provincia: string,
    codigoPostal: string,
}

export type Card = {
    nroTarjeta: string,
    nombreTarjeta: string,
    fechaExp: string,
    codSeguridad: string,
}

export type Order = {
    comic: ComicInfo,
    register: Register,
    delivery: Delivery,
    card: Card,
}