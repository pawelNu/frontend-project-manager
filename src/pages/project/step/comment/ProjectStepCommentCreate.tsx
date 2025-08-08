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
import { ShowActions } from '../../../../components/common/ShowActions';
import { routes } from '../../../../config/routes';
import { formatISOStringToDate, parseDateToISOString } from '../../../../components/shared';

const ProjectStepCommentTitle = () => {
    const appTitle = useDefaultTitle();
    const { defaultTitle } = useCreateContext();
    return (
        <>
            <title>{`${appTitle} - ${defaultTitle}`}</title>
            <span>{defaultTitle}</span>
        </>
    );
};

export const ProjectStepCommentCreate = () => {
    const projectStep = useGetList(routes.projectStep.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'name', order: 'ASC' },
    });
    const employees = useGetList(routes.employee.name(), {
        pagination: { page: 1, perPage: 9999 },
        sort: { field: 'lastName', order: 'ASC' },
    });
    return (
        <Create title={<ProjectStepCommentTitle />} actions={<ShowActions />} mutationMode="pessimistic">
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="comment" label="Comment" validate={required()} fullWidth />
                <AutocompleteInput
                    source="projectStepId"
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
        </Create>
    );
};
