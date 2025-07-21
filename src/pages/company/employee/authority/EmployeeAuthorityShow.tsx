import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../../../config/routes';
import { useNotFoundErrorHandler } from '../../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../../components/common/ShowActions';

const EmployeeAuthorityTitle = () => {
    const record = useRecordContext();
    return <span>Employee: {`${record?.firstName} ${record?.lastName}`}</span>;
};

export const EmployeeAuthorityShow = () => {
    const onError = useNotFoundErrorHandler(routes.employeeAuthority.list());
    return (
        <Show title={<EmployeeAuthorityTitle />} actions={<ShowActions />} queryOptions={{ onError }} emptyWhileLoading>
            <SimpleShowLayout>
                <TextField source="username" />
                <TextField source="authorityNameBackend" />
                <TextField source="authorityNameFrontend" />
                <TextField source="employeeFirstName" />
                <TextField source="employeeLastName" />
            </SimpleShowLayout>
        </Show>
    );
};
