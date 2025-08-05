import {
    AutocompleteInput,
    Create,
    DateInput,
    SimpleForm,
    TextInput,
    required,
    useCreateContext,
    useDefaultTitle,
    useGetList,
} from 'react-admin';
import { ShowActions } from '../../../components/common/ShowActions';
import { routes } from '../../../config/routes';

const ProjectStepTitle = () => {
    const appTitle = useDefaultTitle();
    const { defaultTitle } = useCreateContext();
    return (
        <>
            <title>{`${appTitle} - ${defaultTitle}`}</title>
            <span>{defaultTitle}</span>
        </>
    );
};

export const ProjectStepCreate = () => {
    const projects = useGetList(routes.project.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'name', order: 'ASC' },
    });
    const priorities = useGetList(routes.categoryValue.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'numericValue', order: 'ASC' },
        filter: { categoryName: 'project steps priority' },
    });
    const employees = useGetList(routes.employee.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'lastName', order: 'ASC' },
    });

    return (
        <Create title={<ProjectStepTitle />} actions={<ShowActions />} mutationMode="pessimistic">
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="name" label="Project Step Name" validate={required()} fullWidth />
                <AutocompleteInput
                    source="projectId"
                    label="Project"
                    choices={projects.data ?? []}
                    optionText={(record) => `${record.name}`}
                    optionValue="id"
                    validate={required()}
                    fullWidth
                    isLoading={projects.isLoading}
                />
                <AutocompleteInput
                    source="assignedEmployeeId"
                    label="Employee"
                    choices={employees.data ?? []}
                    optionText={(record) => `${record.firstName} ${record.lastName}`}
                    optionValue="id"
                    validate={required()}
                    fullWidth
                    isLoading={employees.isLoading}
                />
                <AutocompleteInput
                    source="priorityValueId"
                    label="Priority"
                    choices={priorities.data ?? []}
                    optionText={(record) => `${record.numericValue} - ${record.stringValue}`}
                    optionValue="id"
                    validate={required()}
                    fullWidth
                    isLoading={priorities.isLoading}
                />
                <DateInput
                    source="deadline"
                    label="Deadline"
                    validate={required()}
                    fullWidth
                    parse={parseDateToISOString}
                    format={formatISOStringToDate}
                />
            </SimpleForm>
        </Create>
    );
};

const parseDateToISOString = (value: string) => {
    if (!value) return null;
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
};

const formatISOStringToDate = (value: string) => {
    if (!value) return '';
    return value.split('T')[0];
};
