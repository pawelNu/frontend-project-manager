import { Create, SimpleForm, TextInput, required, useCreateContext, useDefaultTitle } from 'react-admin';

const AuthorityTitle = () => {
    const appTitle = useDefaultTitle();
    const { defaultTitle } = useCreateContext();
    return (
        <>
            <title>{`${appTitle} - ${defaultTitle}`}</title>
            <span>{defaultTitle}</span>
        </>
    );
};

export const AuthorityCreate = () => (
    <Create title={<AuthorityTitle />} mutationMode="pessimistic">
        <SimpleForm sx={{ maxWidth: 500 }}>
            <TextInput source="name" label="Company Name" validate={required()} fullWidth />
            <TextInput source="nip" label="NIP" validate={required()} fullWidth />
            <TextInput source="regon" label="REGON" validate={required()} fullWidth />
            <TextInput source="website" label="Website" validate={required()} fullWidth />
        </SimpleForm>
    </Create>
);
