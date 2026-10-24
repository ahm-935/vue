export interface Student {
    id: Number,
    name: String,
    email: String,
    status?: Boolean
}

export const defaultStudent: Student = {
    id: 1100,
    name: 'Sohan',
    email: 'sohan@mail.com'
}