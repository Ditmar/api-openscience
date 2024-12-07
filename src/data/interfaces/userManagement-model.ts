export interface UserManagementModel {
    username: string
    email: string
    password: string
    confirmed: boolean
    blocked: boolean
    role: string[]
}