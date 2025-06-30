import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../components/common/ShowActions';

const CategoryValueShowTitle = () => {
    const record = useRecordContext();
    return <span>CategoryValue: {record?.name}</span>;
};

export const CategoryValueShow = () => {
    const onError = useNotFoundErrorHandler(routes.categoryValue.list());
    return (
        <Show title={<CategoryValueShowTitle />} actions={<ShowActions />} queryOptions={{ onError }}>
            <SimpleShowLayout>
                <TextField source="name" label="Category Value Name" />
                {/* TODO add view for all values for this categoryValue */}
            </SimpleShowLayout>
        </Show>
    );
};
