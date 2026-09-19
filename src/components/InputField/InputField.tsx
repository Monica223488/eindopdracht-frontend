import './InputField.module.css';

type InputFieldProps = {
    name: string;
    inputType: "text" | "email" | "password";
    label: string;
    value: string;
    changeHandler: (value: string) => void;
    placeholder?: string;
};


function InputField({name, inputType, label, value, changeHandler, placeholder}:InputFieldProps) {
    return (
        <>
            <label htmlFor={`${name}-field`}>{label}</label>
            <input
                name={`${name}-field`}
                id={`${name}-field`}
                type={inputType}
                value={value}
                placeholder={placeholder}
                onChange={(e) => changeHandler(e.target.value)}
            />
        </>
    );
}

export default InputField;