import { Edit, SimpleForm, TextInput, required, useEditContext, useDefaultTitle } from 'react-admin';
import { routes } from '../../config/routes';
import { useNotFoundErrorHandler } from '../../hook/useStandardErrorHandler';
import { ShowActions } from '../../components/common/ShowActions';

const CompanyTitle = () => {
    const appTitle = useDefaultTitle();
    const { record } = useEditContext();
    return (
        <>
            <title>{`${appTitle} - ${record ? record.name : ''}`}</title>
            <span>{record ? record.name : 'Edit Company'}</span>
        </>
    );
};

export const CompanyEdit = () => {
    const onError = useNotFoundErrorHandler(routes.company.list());
    return (
        <Edit title={<CompanyTitle />} actions={<ShowActions />} mutationMode="pessimistic" queryOptions={{ onError }}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="name" label="Company Name" validate={required()} fullWidth />
                <TextInput source="nip" label="NIP" validate={required()} fullWidth />
                <TextInput source="regon" label="REGON" validate={required()} fullWidth />
                <TextInput source="website" label="Website" validate={required()} fullWidth />
            </SimpleForm>
        </Edit>
    );
};
