import { useContext } from 'react';
import { DeleteButton, EditButton, EditContext, ListButton, ShowButton, ShowContext, TopToolbar } from 'react-admin';

export const ShowActions = () => {
    const showContext = useContext(ShowContext);
    const editContext = useContext(EditContext);

    return (
        <TopToolbar>
            <ListButton />
            {showContext && (
                <>
                    <EditButton />
                    <DeleteButton />
                </>
            )}
            {editContext && (
                <>
                    <ShowButton />
                    <DeleteButton />
                </>
            )}
        </TopToolbar>
    );
};
