import { UUID } from "crypto";

export type Project = {
    id: UUID;
    name: string;
    isFinished: string;
};
