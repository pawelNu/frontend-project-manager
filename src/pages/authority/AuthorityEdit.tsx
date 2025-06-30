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
                <TextInput source="name" label="Company Name" validate={required()} fullWidth />
                <TextInput source="nip" label="NIP" validate={required()} fullWidth />
                <TextInput source="regon" label="REGON" validate={required()} fullWidth />
                <TextInput source="website" label="Website" validate={required()} fullWidth />
            </SimpleForm>
        </Edit>
    );
};
