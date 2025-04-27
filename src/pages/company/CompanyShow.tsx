import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import Typography from '@mui/material/Typography/Typography';
import { useEffect } from 'react';
import {
    ArrayField,
    Datagrid,
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

const AddressCard = () => {
    const record = useRecordContext();
    console.log(' CompanyShow  test  record:', record);
    const addresses = record?.addresses;
    console.log(' AddressCard test  addresses:', addresses);
    return (
        <Card sx={{ marginTop: 2 }}>
            <CardContent>
                <Typography variant="h6">Address</Typography>
                {addresses.map((addr: any, index: any) => (
                    <div key={index}>
                        <Typography variant="body2">
                            {addr.street} {addr.streetNumber}
                        </Typography>{' '}
                        {/* Używaj street i streetNumber */}
                        <Typography variant="body2">{addr.city}</Typography>
                        <Typography variant="body2">{addr.zipCode}</Typography>
                        <Typography variant="body2">{addr.country}</Typography> {/* Dodaj inne pola, jeśli chcesz */}
                        <Typography variant="body2">{addr.phoneNumber}</Typography> {/* Jeśli chcesz */}
                        <Typography variant="body2">{addr.emailAddress}</Typography> {/* Jeśli chcesz */}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export const CompanyShow = () => {
    return (
        <Show title={<CompanyShowTitle />} actions={<ShowActions />}>
            <SimpleShowLayout>
                <TextField source="name" label="Company Name" />
                <TextField source="nip" label="NIP" />
                <TextField source="regon" label="REGON" />
                <UrlField source="website" label="Website" target="_blank" />
                {/* <AddressCard /> */}
                <ArrayField source="addresses">
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="street" />
                        <TextField source="streetNumber" />
                        <TextField source="city" />
                        <TextField source="zipCode" />
                        <TextField source="country" />
                        <TextField source="phoneNumber" />
                        <TextField source="emailAddress" />
                        <TextField source="addressType" />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
};
