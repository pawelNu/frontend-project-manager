import { Edit, SimpleForm, TextInput, required, useEditContext, useDefaultTitle } from 'react-admin';
import { routes } from '../../config/routes';
import { useNotFoundErrorHandler } from '../../hook/useStandardErrorHandler';

const AuthorityTitle = () => {
    const appTitle = useDefaultTitle();
    const { record } = useEditContext();
    return (
        <>
            <title>{`${appTitle} - ${record ? record.name : ''}`}</title>
            <span>{record ? record.name : 'Edit Authority'}</span>
        </>
    );
};

export const AuthorityEdit = () => {
    const onError = useNotFoundErrorHandler(routes.authority.list());
    return (
        <Edit title={<AuthorityTitle />} mutationMode="pessimistic" queryOptions={{ onError }}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="name" label="Authority Name" validate={required()} fullWidth />
            </SimpleForm>
        </Edit>
    );
};
