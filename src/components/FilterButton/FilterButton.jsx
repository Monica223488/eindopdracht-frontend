import './FilterButton.module.cssButton.module.css';

function FilterButton({text, onClick, type, clickHandler}) {
    return (
        <>
            <button
                onClick={clickHandler}
                type={type}>
                {text}

            </button>
            <label>
                <input type="radio">
                </label>
        </>
    )
}

export default FilterButton;