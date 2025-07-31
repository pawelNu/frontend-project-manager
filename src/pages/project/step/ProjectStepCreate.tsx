import {
    AutocompleteInput,
    Create,
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
    const categories = useGetList(routes.categoryValue.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'stringValue', order: 'ASC' },
        filter: { categoryName: 'project category' },
    });
    const companies = useGetList(routes.company.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'name', order: 'ASC' },
    });
    const employees = useGetList(routes.employee.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'lastName', order: 'ASC' },
    });
    const priorities = useGetList(routes.categoryValue.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'numericValue', order: 'ASC' },
        filter: { categoryName: 'project priority' },
    });
    return (
        <Create title={<ProjectStepTitle />} actions={<ShowActions />} mutationMode="pessimistic">
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="name" label="Project Name" validate={required()} fullWidth />
                <AutocompleteInput
                    source="categoryValueId"
                    label="Category"
                    choices={categories.data ?? []}
                    optionText={(record) => `${record.stringValue}`}
                    optionValue="id"
                    validate={required()}
                    fullWidth
                    isLoading={categories.isLoading}
                />
                <AutocompleteInput
                    source="companyId"
                    label="Company"
                    choices={companies.data ?? []}
                    optionText={(record) => `${record.name}`}
                    optionValue="id"
                    validate={required()}
                    fullWidth
                    isLoading={companies.isLoading}
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
            </SimpleForm>
        </Create>
    );
};
