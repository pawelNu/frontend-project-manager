import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
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
                {/* TODO add list of employees who have this authority */}
            </SimpleShowLayout>
        </Show>
    );
};
