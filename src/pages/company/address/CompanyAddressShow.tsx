import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import Typography from '@mui/material/Typography/Typography';
import {
    ArrayField,
    Datagrid,
    EditButton,
    ListButton,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    useRecordContext,
} from 'react-admin';

const CompanyAddressShowTitle = () => {
    const record = useRecordContext();
    return <span>Company: {record?.name}</span>;
};

const ShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
    </TopToolbar>
);

export const CompanyAddressShow = () => {
    return (
        <Show title={<CompanyAddressShowTitle />} actions={<ShowActions />}>
            <SimpleShowLayout>
                <TextField source="companyName" />
                <TextField source="street" />
                <TextField source="streetNumber" />
                <TextField source="city" />
                <TextField source="zipCode" />
                <TextField source="country" />
                <TextField source="phoneNumber" />
                <TextField source="emailAddress" />
                <TextField source="addressType" />
            </SimpleShowLayout>
        </Show>
    );
};
