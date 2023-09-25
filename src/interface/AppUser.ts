import { UUID } from "crypto"

export interface AppUser {
    id: UUID
    firstName: string
    lastName: string
    email: string
}
