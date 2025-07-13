import { Edit, SimpleForm, TextInput, required, useDefaultTitle, useEditContext } from 'react-admin';
import { routes } from '../../../../config/routes';
import { useNotFoundErrorHandler } from '../../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../../components/common/ShowActions';

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
                <TextInput source="companyName" label="Company Name" fullWidth readOnly />
                <TextInput source="firstName" label="First name" validate={required()} fullWidth />
                <TextInput source="lastName" label="Last name" validate={required()} fullWidth />
                <TextInput source="email" label="Email" validate={required()} fullWidth />
                <TextInput source="phoneNumber" label="Phone Number" validate={required()} fullWidth />
                <TextInput source="username" label="Username" validate={required()} fullWidth />
            </SimpleForm>
        </Edit>
    );
};
