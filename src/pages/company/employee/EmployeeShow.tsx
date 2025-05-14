import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../components/common/ShowActions';

const EmployeeTitle = () => {
    const record = useRecordContext();
    return <span>Employee: {`${record?.firstName} ${record?.lastName}`}</span>;
};

export const EmployeeShow = () => {
    const onError = useNotFoundErrorHandler(routes.employee.list());
    return (
        <Show title={<EmployeeTitle />} actions={<ShowActions />} queryOptions={{ onError }} emptyWhileLoading>
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
