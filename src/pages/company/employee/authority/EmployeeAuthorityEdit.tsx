import { Edit, SimpleForm, TextInput, required, useDefaultTitle, useEditContext } from 'react-admin';
import { routes } from '../../../../config/routes';
import { useNotFoundErrorHandler } from '../../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../../components/common/ShowActions';
// TODO do edit
const EmployeeAuthorityTitle = () => {
    const appTitle = useDefaultTitle();
    const { record } = useEditContext();
    return (
        <>
            <title>{`${appTitle} - ${record ? record.name : ''}`}</title>
            <span>{record ? record.name : 'Edit Employee'}</span>
        </>
    );
};

export const EmployeeAuthorityEdit = () => {
    const onError = useNotFoundErrorHandler(routes.employeeAuthority.list());
    return (
        <Edit
            title={<EmployeeAuthorityTitle />}
            actions={<ShowActions />}
            mutationMode="pessimistic"
            queryOptions={{ onError }}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="authorityName" label="Authority Name" validate={required()} fullWidth />
            </SimpleForm>
        </Edit>
    );
};
