import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../../../config/routes';
import { useNotFoundErrorHandler } from '../../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../../components/common/ShowActions';

const ProjectStepCommentShowTitle = () => {
    const record = useRecordContext();
    return <span>Project step: {record?.name}</span>;
};

export const ProjectStepCommentShow = () => {
    const onError = useNotFoundErrorHandler(routes.projectStepComment.list());
    return (
        <Show title={<ProjectStepCommentShowTitle />} actions={<ShowActions />} queryOptions={{ onError }}>
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
