import {
    List,
    DatagridConfigurable,
    useListContext,
    TextInput,
    FunctionField,
    TextField,
    DateInput,
} from 'react-admin';
import { DropdownActions } from '../../../../components/common/DropdownActions';
import { ListActions } from '../../../../components/common/ListActions';
import { NameLinkField } from '../../../../components/common/NameLinkField';

const listFilters = [
    <TextInput source="comment" label="Comment" alwaysOn />,
    <TextInput source="stepName" label="Step" alwaysOn />,
    <TextInput source="projectName" label="Project" alwaysOn />,
    <TextInput source="employeeName" label="Employee" alwaysOn />,
    <DateInput source="created" label="Created to" alwaysOn />,
];

const ProjectStepCommentTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const ProjectStepCommentList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'created', order: 'DESC' }}
        actions={<ListActions />}
        title={<ProjectStepCommentTitle />}>
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
            <NameLinkField source="comment" label="Comment" resource="projectStepComment" />
            <TextField source="stepName" label="Step" />
            <TextField source="projectName" label="Project" />
            <TextField source="employeeName" label="Employee" />
            <TextField source="created" label="Created" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
