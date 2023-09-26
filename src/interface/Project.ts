import { UUID } from "crypto";

export interface Project {
    id: UUID;
    name: string;
}

export interface ProjectDto {
    name: string
}
