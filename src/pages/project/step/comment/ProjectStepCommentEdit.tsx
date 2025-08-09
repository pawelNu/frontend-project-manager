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
import { routes } from '../../../../config/routes';
import { useNotFoundErrorHandler } from '../../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../../components/common/ShowActions';

const ProjectStepCommentTitle = () => {
    const appTitle = useDefaultTitle();
    const { record } = useEditContext();
    return (
        <>
            <title>{`${appTitle} - ${record ? record.name : ''}`}</title>
            <span>{record ? record.name : 'Edit Project step comment'}</span>
        </>
    );
};

export const ProjectStepCommentEdit = () => {
    const onError = useNotFoundErrorHandler(routes.projectStepComment.list());
    const projectStep = useGetList(routes.projectStep.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'name', order: 'ASC' },
    });
    const employees = useGetList(routes.employee.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'lastName', order: 'ASC' },
    });
    return (
        <Edit
            title={<ProjectStepCommentTitle />}
            actions={<ShowActions />}
            mutationMode="pessimistic"
            queryOptions={{ onError }}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="comment" label="Comment" validate={required()} fullWidth />
                <AutocompleteInput
                    source="stepId"
                    label="Project Step"
                    choices={projectStep.data ?? []}
                    optionText={(record) => `Project: ${record.projectName} - Step: ${record.name}`}
                    optionValue="id"
                    validate={required()}
                    fullWidth
                    isLoading={projectStep.isLoading}
                />
                <AutocompleteInput
                    source="employeeId"
                    label="Employee"
                    choices={employees.data ?? []}
                    optionText={(record) => `${record.firstName} ${record.lastName}`}
                    optionValue="id"
                    validate={required()}
                    fullWidth
                    isLoading={employees.isLoading}
                />
            </SimpleForm>
        </Edit>
    );
};
