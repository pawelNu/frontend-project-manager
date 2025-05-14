import { Edit, SimpleForm, TextInput, required, useDefaultTitle, useEditContext } from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';

const EmployeeTitle = () => {
    const appTitle = useDefaultTitle();
    const { record } = useEditContext();
    return (
        <>
            <title>{`${appTitle} - ${record ? record.name : ''}`}</title>
            <span>{record ? record.name : 'Edit Company Address'}</span>
        </>
    );
};

export const EmployeeEdit = () => {
    const onError = useNotFoundErrorHandler(routes.companyAddress.list());
    return (
        <Edit title={<EmployeeTitle />} mutationMode="pessimistic" queryOptions={{ onError }}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="companyName" label="Company Name" fullWidth readOnly />
                <TextInput source="street" label="Street" validate={required()} fullWidth />
                <TextInput source="streetNumber" label="Street Number" validate={required()} fullWidth />
                <TextInput source="city" label="City" validate={required()} fullWidth />
                <TextInput source="zipCode" label="Zip Code" validate={required()} fullWidth />
                <TextInput source="country" label="Country" validate={required()} fullWidth />
                <TextInput source="phoneNumber" label="Phone Number" validate={required()} fullWidth />
                <TextInput source="emailAddress" label="Email Address" validate={required()} fullWidth />
                <TextInput source="addressType" label="Address Type" validate={required()} fullWidth />
            </SimpleForm>
        </Edit>
    );
};
