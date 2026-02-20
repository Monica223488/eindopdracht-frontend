import './Button.module.css';

function Button({text, type = "button", clickHandler, disabled, className}) {
    return (
        <>
            <button
                type={type}
                onClick={clickHandler}
                disabled={disabled}
                className={className}>
                {text}
            </button>
        </>
    )
}

export default Button;