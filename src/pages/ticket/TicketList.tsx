import { List, DatagridConfigurable, useListContext, TextInput, FunctionField, TextField } from 'react-admin';
import { DropdownActions } from '../../components/common/DropdownActions';
import { ListActions } from '../../components/common/ListActions';
import { NameLinkField } from '../../components/common/NameLinkField';

const listFilters = [
    <TextInput source="name" label="Project Name" alwaysOn />,
    <TextInput source="categoryValue" label="Category" alwaysOn />,
    <TextInput source="companyName" label="Company" alwaysOn />,
    <TextInput source="assignedEmployee" label="Employee" alwaysOn />,
    <TextInput source="priorityValue" label="Priority" alwaysOn />,
];

const TicketTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const TicketList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'name', order: 'ASC' }}
        actions={<ListActions />}
        title={<TicketTitle />}>
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
            <NameLinkField source="name" label="Ticket Name" resource="ticket" />
            <TextField source="categoryValue" label="Category" />
            <TextField source="companyName" label="Company" />
            <TextField source="assignedEmployee" label="Employee" />
            <TextField source="priorityValue" label="Priority" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
