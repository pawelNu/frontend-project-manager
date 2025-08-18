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
            <NameLinkField source="number" label="Ticket History Number" resource="ticketHistory" />
            <TextField source="title" label="Title" />
            <TextField source="deadline" label="Deadline" />
            <TextField source="additionalDetails" label="Details" />
            <TextField source="categoryValue" label="Category" />
            <TextField source="priorityValue" label="Priority" />
            <TextField source="projectName" label="Project" />
            <TextField source="projectStepName" label="Step" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
