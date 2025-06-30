import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../config/routes';
import { useNotFoundErrorHandler } from '../../hook/useStandardErrorHandler';
import { ShowActions } from '../../components/common/ShowActions';

const CategoryShowTitle = () => {
    const record = useRecordContext();
    return <span>Category: {record?.name}</span>;
};

export const CategoryShow = () => {
    const onError = useNotFoundErrorHandler(routes.category.list());
    return (
        <Show title={<CategoryShowTitle />} actions={<ShowActions />} queryOptions={{ onError }}>
            <SimpleShowLayout>
                <TextField source="name" label="Category Name" />
            </SimpleShowLayout>
        </Show>
    );
};
