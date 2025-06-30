import { Create, SimpleForm, TextInput, required, useCreateContext, useDefaultTitle } from 'react-admin';
import { ShowActions } from '../../../components/common/ShowActions';

const CategoryValueTitle = () => {
    const appTitle = useDefaultTitle();
    const { defaultTitle } = useCreateContext();
    return (
        <>
            <title>{`${appTitle} - ${defaultTitle}`}</title>
            <span>{defaultTitle}</span>
        </>
    );
};

export const CategoryValueCreate = () => (
    <Create title={<CategoryValueTitle />} actions={<ShowActions />} mutationMode="pessimistic">
        <SimpleForm sx={{ maxWidth: 500 }}>
            <TextInput source="name" label="Category Value Name" validate={required()} fullWidth />
        </SimpleForm>
    </Create>
);
