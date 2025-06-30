import { Create, SimpleForm, TextInput, required, useCreateContext, useDefaultTitle } from 'react-admin';
import { ShowActions } from '../../components/common/ShowActions';

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
    <Create title={<AuthorityTitle />} actions={<ShowActions />} mutationMode="pessimistic">
        <SimpleForm sx={{ maxWidth: 500 }}>
            <TextInput source="name" label="Authority Name" validate={required()} fullWidth />
        </SimpleForm>
    </Create>
);
