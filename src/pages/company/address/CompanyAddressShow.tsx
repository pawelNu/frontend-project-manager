import {
    DeleteButton,
    EditButton,
    ListButton,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    useRecordContext,
} from 'react-admin';
import { routes } from '../../../config/routes';
import { useNotFoundErrorHandler } from '../../../hook/useStandardErrorHandler';

const CompanyAddressShowTitle = () => {
    const record = useRecordContext();
    return <span>Company: {record?.name}</span>;
};

const ShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
        <DeleteButton />
    </TopToolbar>
);

export const CompanyAddressShow = () => {
    const onError = useNotFoundErrorHandler(routes.companyAddress.list());
    return (
        <Show
            title={<CompanyAddressShowTitle />}
            actions={<ShowActions />}
            queryOptions={{ onError }}
            emptyWhileLoading>
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
