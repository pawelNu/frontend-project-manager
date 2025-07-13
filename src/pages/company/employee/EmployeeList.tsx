import {
    List,
    DatagridConfigurable,
    TextField,
    useListContext,
    TextInput,
    FunctionField,
} from 'react-admin';
import { DropdownActions } from '../../../components/common/DropdownActions';
import { ListActions } from '../../../components/common/ListActions';

const filters = [
    <TextInput source="lastName" label="Last Name" alwaysOn />,
    <TextInput source="firstName" label="First Name" />,
    <TextInput source="companyName" label="Company Name" />,
];

const EmployeeTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const EmployeeList = () => (
    <List
        filters={filters}
        perPage={25}
        sort={{ field: 'username', order: 'ASC' }}
        actions={<ListActions />}
        title={<EmployeeTitle />}>
        <DatagridConfigurable rowClick="expand">
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="username" />
            <TextField source="email" />
            <TextField source="phoneNumber" />
            <TextField source="companyName" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
