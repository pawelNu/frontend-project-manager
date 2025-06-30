import { Create, SimpleForm, TextInput, required, useCreateContext, useDefaultTitle } from 'react-admin';
import { ShowActions } from '../../components/common/ShowActions';

const CategoryTitle = () => {
    const appTitle = useDefaultTitle();
    const { defaultTitle } = useCreateContext();
    return (
        <>
            <title>{`${appTitle} - ${defaultTitle}`}</title>
            <span>{defaultTitle}</span>
        </>
    );
};

export const CategoryCreate = () => (
    <Create title={<CategoryTitle />} actions={<ShowActions />} mutationMode="pessimistic">
        <SimpleForm sx={{ maxWidth: 500 }}>
            <TextInput source="name" label="Category Name" validate={required()} fullWidth />
        </SimpleForm>
    </Create>
);
