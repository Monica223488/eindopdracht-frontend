import styles from './Button.module.css';

type ButtonProps = {
    text: string;
    type?: "button" | "submit" | "reset";
    clickHandler?: () => void;
    disabled?: boolean;
    className?: string;
};

function Button({text, type = "button", clickHandler, disabled, className}:ButtonProps) {
    return (
            <button
                type={type}
                onClick={clickHandler}
                disabled={disabled}
                className={styles.button}>
                {text}
            </button>
    )
}

export default Button;