import { Edit, SimpleForm, TextInput } from "react-admin";

const DollarEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="rate" label="Valor del dólar" />
    </SimpleForm>
  </Edit>
);

export default DollarEdit;
