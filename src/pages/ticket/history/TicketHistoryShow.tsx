import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../components/common/ShowActions';

const TicketHistoryShowTitle = () => {
    const record = useRecordContext();
    return <span>Ticket History: {record?.name}</span>;
};

export const TicketHistoryShow = () => {
    const onError = useNotFoundErrorHandler(routes.ticketHistory.list());
    return (
        <Show title={<TicketHistoryShowTitle />} actions={<ShowActions />} queryOptions={{ onError }}>
            <SimpleShowLayout>
                <TextField source="ticketNumber" label="Ticket Number" />
                <TextField source="ticketTitle" label="Ticket Title" />
                <TextField source="fromStatusName" label="From Status" />
                <TextField source="toStatusName" label="To Status" />
                <TextField source="fromEmployeeName" label="From Employee" />
                <TextField source="toEmployeeName" label="To Employee" />
                <TextField source="comment" label="Comment" />
                <TextField source="created" label="Created" />
            </SimpleShowLayout>
        </Show>
    );
};
