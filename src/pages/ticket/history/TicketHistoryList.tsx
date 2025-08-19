import {
    List,
    DatagridConfigurable,
    useListContext,
    TextInput,
    FunctionField,
    TextField,
    DateInput,
} from 'react-admin';
import { DropdownActions } from '../../../components/common/DropdownActions';
import { ListActions } from '../../../components/common/ListActions';
import { NameLinkField } from '../../../components/common/NameLinkField';

const listFilters = [
    <TextInput source="ticketNumber" label="Ticket Number" alwaysOn />,
    <TextInput source="ticketTitle" label="Ticket Title" alwaysOn />,
    <TextInput source="fromStatusName" label="From Status" alwaysOn />,
    <TextInput source="toStatusName" label="To Status" alwaysOn />,
    <TextInput source="fromEmployeeName" label="From Employee" alwaysOn />,
    <TextInput source="toEmployeeName" label="To Employee" alwaysOn />,
    <TextInput source="comment" label="Comment" alwaysOn />,
    <DateInput source="created" label="Created" alwaysOn />,
];

const TicketHistoryTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const TicketHistoryList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'created', order: 'ASC' }}
        actions={<ListActions />}
        title={<TicketHistoryTitle />}>
        <DatagridConfigurable
            rowClick={false}
            sx={{
                '& .column-nip': {
                    display: { xs: 'none', md: 'table-cell' },
                },
                '& .column-regon': {
                    display: { xs: 'none', md: 'table-cell' },
                },
            }}>
            <NameLinkField source="ticketNumber" label="Ticket Number" resource="ticketHistory" />
            <TextField source="ticketTitle" label="Ticket Title" />
            <TextField source="fromStatusName" label="From Status" />
            <TextField source="toStatusName" label="To Status" />
            <TextField source="fromEmployeeName" label="From Employee" />
            <TextField source="toEmployeeName" label="To Employee" />
            <TextField source="comment" label="Comment" />
            <TextField source="created" label="Created" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
