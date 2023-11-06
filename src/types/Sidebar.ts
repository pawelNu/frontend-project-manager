export type Sidebar = {
    levelName: string;
    subLevel: SubLevel[];
};

type SubLevel = {
    levelName: string;
    linkTo: string;
};
