export type TSidebar = {
    levelName: string;
    subLevel: TSubLevel[];
};

type TSubLevel = {
    levelName: string;
    linkTo: string;
};
