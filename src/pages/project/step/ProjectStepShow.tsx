import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../components/common/ShowActions';

const ProjectStepShowTitle = () => {
    const record = useRecordContext();
    return <span>Project step: {record?.name}</span>;
};

export const ProjectStepShow = () => {
    const onError = useNotFoundErrorHandler(routes.projectStep.list());
    return (
        <Show title={<ProjectStepShowTitle />} actions={<ShowActions />} queryOptions={{ onError }}>
            <SimpleShowLayout>
                <TextField source="name" label="Project Step Name" />
                <TextField source="priorityValue" label="Priority" />
                <TextField source="projectName" label="Project" />
                <TextField source="assignedEmployee" label="Employee" />
                <TextField source="deadline" label="Deadline" />
            </SimpleShowLayout>
        </Show>
    );
};
