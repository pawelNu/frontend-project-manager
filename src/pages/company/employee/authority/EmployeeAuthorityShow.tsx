import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../../../config/routes';
import { useNotFoundErrorHandler } from '../../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../../components/common/ShowActions';
// TODO do show
// TODO do wiew with users and their authorities
const EmployeeAuthorityTitle = () => {
    const record = useRecordContext();
    return <span>Employee: {`${record?.firstName} ${record?.lastName}`}</span>;
};

export const EmployeeAuthorityShow = () => {
    const onError = useNotFoundErrorHandler(routes.employeeAuthority.list());
    return (
        <Show title={<EmployeeAuthorityTitle />} actions={<ShowActions />} queryOptions={{ onError }} emptyWhileLoading>
            <SimpleShowLayout>
                <TextField source="firstName" />
                <TextField source="lastName" />
                <TextField source="username" />
                <TextField source="email" />
                <TextField source="phoneNumber" />
                <TextField source="companyName" />
            </SimpleShowLayout>
        </Show>
    );
};
