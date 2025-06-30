import { Edit, SimpleForm, TextInput, required, useEditContext, useDefaultTitle } from 'react-admin';
import { routes } from '../../config/routes';
import { useNotFoundErrorHandler } from '../../hook/useStandardErrorHandler';

const CategoryTitle = () => {
    const appTitle = useDefaultTitle();
    const { record } = useEditContext();
    return (
        <>
            <title>{`${appTitle} - ${record ? record.name : ''}`}</title>
            <span>{record ? record.name : 'Edit Category'}</span>
        </>
    );
};

export const CategoryEdit = () => {
    const onError = useNotFoundErrorHandler(routes.Category.list());
    return (
        <Edit title={<CategoryTitle />} mutationMode="pessimistic" queryOptions={{ onError }}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="name" label="Category Name" validate={required()} fullWidth />
            </SimpleForm>
        </Edit>
    );
};
