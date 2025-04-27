import {
    List,
    DatagridConfigurable,
    TextField,
    TopToolbar,
    ExportButton,
    SelectColumnsButton,
    FilterButton,
    useListContext,
    TextInput,
    UrlField,
    CreateButton,
    FunctionField,
} from 'react-admin';
import { DropdownActions } from '../../components/common/DropdownActions';

const listFilters = [
    <TextInput source="name" label="Company Name" alwaysOn />,
    <TextInput source="nip" label="NIP" />,
    <TextInput source="regon" label="REGON" />,
];

const ListActions = () => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
        <SelectColumnsButton />
        <ExportButton />
    </TopToolbar>
);

const CompanyTitle = () => {
    const { defaultTitle } = useListContext();
    return (
        <>
            <span>{defaultTitle}</span>
        </>
    );
};

export const CompanyList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'name', order: 'ASC' }}
        actions={<ListActions />}
        title={<CompanyTitle />}>
        <DatagridConfigurable
            rowClick="expand"
            sx={{
                '& .column-nip': {
                    display: { xs: 'none', md: 'table-cell' },
                },
                '& .column-regon': {
                    display: { xs: 'none', md: 'table-cell' },
                },
            }}>
            <TextField source="name" label="Name" />
            <TextField source="nip" label="NIP" />
            <TextField source="regon" label="REGON" />
            <UrlField source="website" label="Website" target="_blank" />
            <FunctionField label="Actions" render={(record) => <DropdownActions record={record} />} />
        </DatagridConfigurable>
    </List>
);
