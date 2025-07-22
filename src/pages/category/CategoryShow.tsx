import { ArrayField, Datagrid, Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
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
                <ArrayField source="values">
                    <Datagrid
                        bulkActionButtons={false}
                        rowClick={(_id, _resource, record) => routes.category.show(record.id)}>
                        <TextField source="numericValue" />
                        <TextField source="stringValue" />
                        <TextField source="dateValue" />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
};
