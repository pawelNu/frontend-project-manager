import { UUID } from "crypto";

export interface Project {
    id: UUID;
    name: string;
    finished: string;
}

export interface AddProjectDto {
    name: string
}

export interface ProjectDto {
    name: string;
    finished: string;
}
