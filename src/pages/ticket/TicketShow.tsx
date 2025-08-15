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
                <TextField source="number" label="Ticket Number" />
                <TextField source="title" label="Title" />
                <TextField source="deadline" label="Deadline" />
                <TextField source="additionalDetails" label="Details" />
                <TextField source="categoryValue" label="Category" />
                <TextField source="priorityValue" label="Priority" />
                <TextField source="projectName" label="Project" />
                <TextField source="projectStepName" label="Step" />
            </SimpleShowLayout>
        </Show>
    );
};
