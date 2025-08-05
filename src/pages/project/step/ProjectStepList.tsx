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
    <TextInput source="name" label="Project Step Name" alwaysOn />,
    <TextInput source="priorityValue" label="Priority" alwaysOn />,
    <TextInput source="projectName" label="Project Name" alwaysOn />,
    <TextInput source="assignedEmployee" label="Employee" alwaysOn />,
    <DateInput source="deadline" label="Deadline to" alwaysOn />,
];

const ProjectStepTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const ProjectStepList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'name', order: 'ASC' }}
        actions={<ListActions />}
        title={<ProjectStepTitle />}>
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
            <NameLinkField source="name" label="Project Step Name" resource="projectStep" />
            <TextField source="priorityValue" label="Priority" />
            <TextField source="projectName" label="Project" />
            <TextField source="assignedEmployee" label="Employee" />
            <TextField source="deadline" label="Deadline" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
