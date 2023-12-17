import { TSidebar } from "../types/TSidebar";

export const sidebarElements: TSidebar[] = [
    {
        levelName: "Projects",
        subLevel: [
            { levelName: "All projects", linkTo: "/all-projects" },
            { levelName: "Add new project", linkTo: "/add-new-project" },
        ],
    },
    {
        levelName: "Users",
        subLevel: [
            { levelName: "All users", linkTo: "/" },
            { levelName: "Empty", linkTo: "/" },
        ],
    },
    {
        levelName: "Account",
        subLevel: [
            { levelName: "New...", linkTo: "/" },
            { levelName: "Profile", linkTo: "/" },
            { levelName: "Settings", linkTo: "/" },
            { levelName: "Sign out", linkTo: "/" },
        ],
    },
];
