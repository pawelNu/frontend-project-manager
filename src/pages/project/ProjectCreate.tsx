import { Create, SimpleForm, TextInput, required, useCreateContext, useDefaultTitle } from 'react-admin';
import { ShowActions } from '../../components/common/ShowActions';

const ProjectTitle = () => {
    const appTitle = useDefaultTitle();
    const { defaultTitle } = useCreateContext();
    return (
        <>
            <title>{`${appTitle} - ${defaultTitle}`}</title>
            <span>{defaultTitle}</span>
        </>
    );
};

export const ProjectCreate = () => (
    <Create title={<ProjectTitle />} actions={<ShowActions />} mutationMode="pessimistic">
        <SimpleForm sx={{ maxWidth: 500 }}>
            <TextInput source="name" label="Project Name" validate={required()} fullWidth />
        </SimpleForm>
    </Create>
);
