export type ComicInfo = {
    img: string,
    price: number,
    title: string,
}

export type Register = {
    nombre:string
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

export type FinishedOrder = {
    comic: ComicInfo,
    comprador: Register,
    direccion: Delivery,
}

export type Snackbar = {
    open: boolean,
    message: string,
}