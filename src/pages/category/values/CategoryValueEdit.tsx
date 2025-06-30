import { Edit, SimpleForm, TextInput, required, useEditContext, useDefaultTitle } from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';

const CategoryValueTitle = () => {
    const appTitle = useDefaultTitle();
    const { record } = useEditContext();
    return (
        <>
            <title>{`${appTitle} - ${record ? record.name : ''}`}</title>
            <span>{record ? record.name : 'Edit Category Value'}</span>
        </>
    );
};

export const CategoryValueEdit = () => {
    const onError = useNotFoundErrorHandler(routes.categoryValue.list());
    return (
        <Edit title={<CategoryValueTitle />} mutationMode="pessimistic" queryOptions={{ onError }}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="name" label="Category Value Name" validate={required()} fullWidth />
            </SimpleForm>
        </Edit>
    );
};
