import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../../../config/routes';
import { useNotFoundErrorHandler } from '../../../../hook/useStandardErrorHandler';
import { ShowActions } from '../../../../components/common/ShowActions';

const ProjectStepCommentShowTitle = () => {
    const record = useRecordContext();
    return <span>Project step comment: {record?.name}</span>;
};

export const ProjectStepCommentShow = () => {
    const onError = useNotFoundErrorHandler(routes.projectStepComment.list());
    return (
        <Show title={<ProjectStepCommentShowTitle />} actions={<ShowActions />} queryOptions={{ onError }}>
            <SimpleShowLayout>
                <TextField source="comment" label="Comment" />
                <TextField source="created" label="Created" />
                <TextField source="projectName" label="Project" />
                <TextField source="stepName" label="Step" />
                <TextField source="employeeName" label="Employee" />
            </SimpleShowLayout>
        </Show>
    );
};
