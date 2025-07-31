import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    useEditContext,
    useDefaultTitle,
    useGetList,
    AutocompleteInput,
} from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../components/common/ShowActions';

const ProjectStepTitle = () => {
    const appTitle = useDefaultTitle();
    const { record } = useEditContext();
    return (
        <>
            <title>{`${appTitle} - ${record ? record.name : ''}`}</title>
            <span>{record ? record.name : 'Edit Project step'}</span>
        </>
    );
};

export const ProjectStepEdit = () => {
    const onError = useNotFoundErrorHandler(routes.project.list());
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
        <Edit
            title={<ProjectStepTitle />}
            actions={<ShowActions />}
            mutationMode="pessimistic"
            queryOptions={{ onError }}>
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
        </Edit>
    );
};
