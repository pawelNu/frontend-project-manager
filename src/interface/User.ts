import { UUID } from "crypto"

export interface User {
    id: UUID
    firstName: string
    lastName: string
    email: string
}
