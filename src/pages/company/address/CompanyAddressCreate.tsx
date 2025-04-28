import {
    AutocompleteInput,
    Create,
    ReferenceInput,
    SimpleForm,
    TextInput,
    required,
    useCreateContext,
    useDefaultTitle,
    useGetList,
} from 'react-admin';

const CompanyAddressTitle = () => {
    const appTitle = useDefaultTitle();
    const { defaultTitle } = useCreateContext();
    return (
        <>
            <title>{`${appTitle} - ${defaultTitle}`}</title>
            <span>{defaultTitle}</span>
        </>
    );
};

export const CompanyAddressCreate = () => {
    const { data: companies, isLoading } = useGetList('companies', {
        pagination: { page: 1, perPage: 9999 }, // Get all companies (or adjust perPage based on your use case)
        sort: { field: 'name', order: 'ASC' }, // Sort by company name
    });
    // const handleSubmit = (values: any) => {
    //     const transformedValues = {
    //         ...values,
    //         companyId: values.id,
    //         id: undefined,
    //     };

    //     console.log(JSON.stringify(transformedValues, null, 2));
    // };
    // TODO change id in request body to companyId
    return (
        <Create title={<CompanyAddressTitle />} mutationMode="pessimistic">
            <SimpleForm sx={{ maxWidth: 500 }} /*onSubmit={handleSubmit}*/>
                <AutocompleteInput
                    source="id"
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
