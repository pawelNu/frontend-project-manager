import { DeleteButton, EditButton, ListButton, TopToolbar } from 'react-admin';

export const ShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
        <DeleteButton />
    </TopToolbar>
);
