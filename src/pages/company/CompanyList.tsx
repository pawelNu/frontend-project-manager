import Box from "@mui/material/Box/Box";
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
    EditButton,
    FunctionField,
    DeleteButton,
    Show,
    ShowButton,
} from "react-admin";

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
        sort={{ field: "name", order: "ASC" }} // Możesz posortować po nazwie firmy
        actions={<ListActions />}
        title={<CompanyTitle />}
    >
        <DatagridConfigurable
            rowClick="expand" // Możesz rozwinąć wiersz, aby wyświetlić szczegóły
            sx={{
                "& .column-nip": {
                    display: { xs: "none", md: "table-cell" }, // ukryj kolumnę 'nip' na małych ekranach
                },
                "& .column-regon": {
                    display: { xs: "none", md: "table-cell" }, // ukryj kolumnę 'regon' na małych ekranach
                },
            }}
        >
            {/* <TextField source="id" label="Company ID" /> */}
            <TextField source="name" label="Name" />
            <TextField source="nip" label="NIP" />
            <TextField source="regon" label="REGON" />
            <UrlField source="website" label="Website" target="_blank" />
            <FunctionField
                label="Actions"
                render={(record) => (
                    <Box display="flex" gap={1}>
                        <ShowButton record={record} />
                        <EditButton record={record} />
                        <DeleteButton record={record} />
                    </Box>
                )}
            />
        </DatagridConfigurable>
    </List>
);
