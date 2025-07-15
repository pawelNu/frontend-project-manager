import { Edit, SimpleForm, TextInput, required, useEditContext, useDefaultTitle } from 'react-admin';
import { routes } from '../../config/routes';
import { useNotFoundErrorHandler } from '../../hook/useStandardErrorHandler';
import { ShowActions } from '../../components/common/ShowActions';

const ProjectTitle = () => {
    const appTitle = useDefaultTitle();
    const { record } = useEditContext();
    return (
        <>
            <title>{`${appTitle} - ${record ? record.name : ''}`}</title>
            <span>{record ? record.name : 'Edit Project'}</span>
        </>
    );
};

export const ProjectEdit = () => {
    const onError = useNotFoundErrorHandler(routes.Project.list());
    return (
        <Edit title={<ProjectTitle />} actions={<ShowActions />} mutationMode="pessimistic" queryOptions={{ onError }}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <TextInput source="name" label="Project Name" validate={required()} fullWidth />
            </SimpleForm>
        </Edit>
    );
};
