import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  useEditContext,
  useDefaultTitle,
} from "react-admin";

const CompanyTitle = () => {
  const appTitle = useDefaultTitle();
  const { record } = useEditContext(); // używamy `useEditContext` do dostępu do rekordu
  return (
    <>
      <title>{`${appTitle} - ${record ? record.name : ""}`}</title>
      <span>{record ? record.name : "Edit Company"}</span>
    </>
  );
};

export const CompanyEdit = () => (
  <Edit title={<CompanyTitle />} mutationMode="pessimistic">
    <SimpleForm sx={{ maxWidth: 500 }}>
      <TextInput
        source="name"
        label="Company Name"
        validate={required()}
        fullWidth
      />
      <TextInput source="nip" label="NIP" validate={required()} fullWidth />
      <TextInput source="regon" label="REGON" validate={required()} fullWidth />
      <TextInput
        source="website"
        label="Website"
        validate={required()}
        fullWidth
      />
    </SimpleForm>
  </Edit>
);
