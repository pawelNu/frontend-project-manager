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
// TODO adjust filters
const listFilters = [
    <TextInput source="number" label="Ticket History Number" alwaysOn />,
    <TextInput source="title" label="Title" alwaysOn />,
    <DateInput source="deadline" label="Deadline" alwaysOn />,
    <TextInput source="additionalDetails" label="Details" alwaysOn />,
    <TextInput source="categoryValue" label="Category" alwaysOn />,
    <TextInput source="priorityValue" label="Priority" alwaysOn />,
    <TextInput source="projectName" label="Project" alwaysOn />,
    <TextInput source="projectStepName" label="Step" alwaysOn />,
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
        sort={{ field: 'number', order: 'ASC' }}
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
