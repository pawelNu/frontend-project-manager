import {
    AutocompleteInput,
    Create,
    SimpleForm,
    TextInput,
    required,
    useCreateContext,
    useDefaultTitle,
    useGetList,
} from 'react-admin';

const EmployeeTitle = () => {
    const appTitle = useDefaultTitle();
    const { defaultTitle } = useCreateContext();
    return (
        <>
            <title>{`${appTitle} - ${defaultTitle}`}</title>
            <span>{defaultTitle}</span>
        </>
    );
};

export const EmployeeCreate = () => {
    const { data: companies, isLoading } = useGetList('companies', {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'name', order: 'ASC' },
    });
    return (
        <Create title={<EmployeeTitle />} mutationMode="pessimistic">
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
                <TextInput source="street" label="Street" validate={required()} fullWidth />
                <TextInput source="streetNumber" label="Street Number" validate={required()} fullWidth />
                <TextInput source="city" label="City" validate={required()} fullWidth />
                <TextInput source="zipCode" label="Zip Code" validate={required()} fullWidth />
                <TextInput source="country" label="Country" validate={required()} fullWidth />
                <TextInput source="phoneNumber" label="Phone Number" validate={required()} fullWidth />
                <TextInput source="emailAddress" label="Email Address" validate={required()} fullWidth />
                <TextInput source="addressType" label="Address Type" validate={required()} fullWidth />
            </SimpleForm>
        </Create>
    );
};
