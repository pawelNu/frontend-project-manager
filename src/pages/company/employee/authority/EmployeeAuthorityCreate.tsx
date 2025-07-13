import {
    AutocompleteInput,
    Create,
    PasswordInput,
    SimpleForm,
    TextInput,
    required,
    useCreateContext,
    useDefaultTitle,
    useGetList,
} from 'react-admin';
import { ShowActions } from '../../../../components/common/ShowActions';

const EmployeeAuthorityTitle = () => {
    const appTitle = useDefaultTitle();
    const { defaultTitle } = useCreateContext();
    return (
        <>
            <title>{`${appTitle} - ${defaultTitle}`}</title>
            <span>{defaultTitle}</span>
        </>
    );
};

export const EmployeeAuthorityCreate = () => {
    const { data: companies, isLoading } = useGetList('companies', {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'name', order: 'ASC' },
    });
    return (
        <Create title={<EmployeeAuthorityTitle />} actions={<ShowActions />} mutationMode="pessimistic">
            <SimpleForm sx={{ maxWidth: 500 }}>
                <AutocompleteInput
                    source="companyId"
                    label="Company"
                    choices={companies ?? []}
                    optionText="name"
                    optionValue="id"
                    validate={required()}
                    fullWidth
                    isLoading={isLoading}
                />
                <TextInput source="firstName" label="First name" validate={required()} fullWidth />
                <TextInput source="lastName" label="Last name" validate={required()} fullWidth />
                <TextInput source="email" label="Email" validate={required()} fullWidth />
                <TextInput source="phoneNumber" label="Phone Number" validate={required()} fullWidth />
                <TextInput source="username" label="Username" validate={required()} fullWidth />
                <PasswordInput source="password" label="Password" validate={required()} fullWidth />
            </SimpleForm>
        </Create>
    );
};
