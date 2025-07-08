import { Show, SimpleShowLayout, TextField, useShowContext } from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../components/common/ShowActions';
import { fields } from './CategoryValueShared';

const CategoryValueShowTitle = () => {
    const { record } = useShowContext();
    return <span>CategoryValue: {record?.name}</span>;
};

const CategoryValueShowContent = () => {
    const { record } = useShowContext();
    if (!record) return null;

    const visibleFields = fields.filter(({ source }) => {
        const value = record[source];
        return value != null && !(typeof value === 'string' && value.trim() === '');
    });

    return (
        <SimpleShowLayout>
            <TextField source="categoryName" label="Category Name" />
            {visibleFields.map(({ source, label }) => (
                <TextField key={source} source={source} label={label} />
            ))}
        </SimpleShowLayout>
    );
};

export const CategoryValueShow = () => {
    const onError = useNotFoundErrorHandler(routes.categoryValue.list());
    return (
        <Show title={<CategoryValueShowTitle />} actions={<ShowActions />} queryOptions={{ onError }}>
            <CategoryValueShowContent />
        </Show>
    );
};
