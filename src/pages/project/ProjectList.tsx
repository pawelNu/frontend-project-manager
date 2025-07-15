import {
    List,
    DatagridConfigurable,
    useListContext,
    TextInput,
    FunctionField,
    Link,
    TextField,
    useRecordContext,
} from 'react-admin';
import { DropdownActions } from '../../components/common/DropdownActions';
import { routes } from '../../config/routes';
import { ListActions } from '../../components/common/ListActions';
import { NameLinkField } from '../../components/common/NameLinkField';

const listFilters = [<TextInput source="name" label="Project Name" alwaysOn />];

const ProjectTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const ProjectList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'name', order: 'ASC' }}
        actions={<ListActions />}
        title={<ProjectTitle />}>
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
            <NameLinkField source="name" label="Project Name" resource="project" />
            <TextField source="categoryValue" label="Category" />
            <TextField source="companyName" label="Company" />
            <TextField source="assignedEmployee" label="Employee" />
            <TextField source="priorityValue" label="Priority" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
