import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../config/routes';
import { useNotFoundErrorHandler } from '../../hook/useStandardErrorHandler';
import { ShowActions } from '../../components/common/ShowActions';

const TicketShowTitle = () => {
    const record = useRecordContext();
    return <span>Ticket: {record?.name}</span>;
};

export const TicketShow = () => {
    const onError = useNotFoundErrorHandler(routes.ticket.list());
    return (
        <Show title={<TicketShowTitle />} actions={<ShowActions />} queryOptions={{ onError }}>
            <SimpleShowLayout>
                <TextField source="name" label="Ticket Name" />
                <TextField source="categoryValue" label="Category" />
                <TextField source="companyName" label="Company" />
                <TextField source="assignedEmployee" label="Employee" />
                <TextField source="priorityValue" label="Priority" />
            </SimpleShowLayout>
        </Show>
    );
};
