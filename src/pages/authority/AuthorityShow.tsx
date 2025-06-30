import { Show, SimpleShowLayout, TextField, UrlField, useRecordContext } from 'react-admin';
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
                <TextField source="name" label="Company Name" />
                <TextField source="nip" label="NIP" />
                <TextField source="regon" label="REGON" />
                <UrlField source="website" label="Website" target="_blank" />
            </SimpleShowLayout>
        </Show>
    );
};
