import { ArrayField, Datagrid, Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../config/routes';
import { useNotFoundErrorHandler } from '../../hook/useStandardErrorHandler';
import { ShowActions } from '../../components/common/ShowActions';

const AuthorityShowTitle = () => {
    const record = useRecordContext();
    return <span>Authority: {record?.name}</span>;
};

export const AuthorityShow = () => {
    const onError = useNotFoundErrorHandler(routes.authority.list());
    return (
        <Show title={<AuthorityShowTitle />} actions={<ShowActions />} queryOptions={{ onError }}>
            <SimpleShowLayout>
                <TextField source="nameBackend" label="Authority backend" />
                <TextField source="nameFrontend" label="Authority frontend" />
                <ArrayField source="employees">
                    <Datagrid
                        bulkActionButtons={false}
                        rowClick={(_id, _resource, record) => routes.authority.show(record.id)}>
                        <TextField source="firstName" />
                        <TextField source="lastName" />
                        <TextField source="username" />
                        <TextField source="companyName" />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
};
