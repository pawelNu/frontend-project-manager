import { CreateButton, ExportButton, FilterButton, SelectColumnsButton, TopToolbar } from "react-admin";

export const ListActions = () => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
        <SelectColumnsButton />
        <ExportButton />
    </TopToolbar>
);