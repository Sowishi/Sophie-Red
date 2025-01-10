import { Label, TextInput } from "flowbite-react";

const CustomInput = ({ label, placeholder, onChange, value, type, name }) => {
  return (
    <div className="my-5">
      <div className="mb-2 block">
        <Label htmlFor="email2" value={label} />
      </div>
      <TextInput
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        shadow
      />
    </div>
  );
};

export default CustomInput;
