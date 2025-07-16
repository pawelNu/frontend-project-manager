import { Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { routes } from '../../config/routes';
import { useNotFoundErrorHandler } from '../../hook/useStandardErrorHandler';
import { ShowActions } from '../../components/common/ShowActions';

const ProjectShowTitle = () => {
    const record = useRecordContext();
    return <span>Project: {record?.name}</span>;
};

export const ProjectShow = () => {
    const onError = useNotFoundErrorHandler(routes.project.list());
    return (
        <Show title={<ProjectShowTitle />} actions={<ShowActions />} queryOptions={{ onError }}>
            <SimpleShowLayout>
                <TextField source="name" label="Project Name" />
                <TextField source="categoryValue" label="Category" />
                <TextField source="companyName" label="Company" />
                <TextField source="assignedEmployee" label="Employee" />
                <TextField source="priorityValue" label="Priority" />
            </SimpleShowLayout>
        </Show>
    );
};
