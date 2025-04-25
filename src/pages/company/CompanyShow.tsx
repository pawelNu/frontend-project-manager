import {
    EditButton,
    ListButton,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    UrlField,
    useRecordContext,
} from 'react-admin';

const CompanyShowTitle = () => {
    const record = useRecordContext();
    return <span>Company: {record?.name}</span>;
};

const ShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
    </TopToolbar>
);

export const CompanyShow = () => (
    <Show title={<CompanyShowTitle />} actions={<ShowActions />}>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Company Name" />
            <TextField source="nip" label="NIP" />
            <TextField source="regon" label="REGON" />
            <UrlField source="website" label="Website" target="_blank" />
        </SimpleShowLayout>
    </Show>
);
