import { List, DatagridConfigurable, TextField, useListContext, TextInput, FunctionField } from 'react-admin';
import { DropdownActions } from '../../../../components/common/DropdownActions';
import { ListActions } from '../../../../components/common/ListActions';

const filters = [
    <TextInput source="username" label="Username" alwaysOn />,
    <TextInput source="authorityName" label="Authority Name" alwaysOn />,
    <TextInput source="employeeFirstName" label="First Name" />,
    <TextInput source="employeeLastName" label="Last Name" />,
];

const EmployeeAuthorityTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};
// FIXME when delete item and 403 then item get back to list
// without any notification, add notification
export const EmployeeAuthorityList = () => (
    <List
        filters={filters}
        perPage={25}
        sort={{ field: 'username', order: 'ASC' }}
        actions={<ListActions />}
        title={<EmployeeAuthorityTitle />}>
        <DatagridConfigurable rowClick="expand">
            <TextField source="username" />
            <TextField source="employeeFirstName" />
            <TextField source="employeeLastName" />
            <TextField source="authorityName" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
