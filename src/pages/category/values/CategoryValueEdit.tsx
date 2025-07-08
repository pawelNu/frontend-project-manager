import { Edit, SimpleForm, TextInput, required, useEditContext, useDefaultTitle } from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';
import { fields } from './CategoryValueShared';
import { ShowActions } from '../../../components/common/ShowActions';

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

const FilteredInputs = () => {
    const { record } = useEditContext();
    if (!record) return null;

    const visibleFields = fields.filter(({ source }) => {
        const value = record[source];
        return value != null && !(typeof value === 'string' && value.trim() === '');
    });

    return (
        <>
            {visibleFields.map(({ source, label }) => (
                <TextInput key={source} source={source} label={label} validate={required()} fullWidth />
            ))}
        </>
    );
};

export const CategoryValueEdit = () => {
    const onError = useNotFoundErrorHandler(routes.categoryValue.list());
    return (
        <Edit
            title={<CategoryValueTitle />}
            actions={<ShowActions />}
            mutationMode="pessimistic"
            queryOptions={{ onError }}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="categoryName" label="Category Value" fullWidth disabled />
                <FilteredInputs />
            </SimpleForm>
        </Edit>
    );
};

// export const CategoryValueEdit = () => {
//     const onError = useNotFoundErrorHandler(routes.categoryValue.list());
//     return (
//         <Edit title={<CategoryValueTitle />} mutationMode="pessimistic" queryOptions={{ onError }}>
//             <SimpleForm sx={{ maxWidth: 500 }}>
//                 <TextInput source="categoryName" label="Category Value" fullWidth readOnly />
//                 <TextInput source="stringValue" label="String Value" validate={required()} fullWidth />
//                 <TextInput source="numericValue" label="Numeric Value" validate={required()} fullWidth />
//                 <TextInput source="dateValue" label="Date Value" validate={required()} fullWidth />
//             </SimpleForm>
//         </Edit>
//     );
// };
