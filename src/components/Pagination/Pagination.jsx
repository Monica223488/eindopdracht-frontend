import styles from './Pagination.module.css';
import PropTypes from "prop-types";
import Button from '../../components/Button/Button.jsx';

function Pagination({page, totalPages, onPrevious, onNext}) {
    return (
        <>
        <Button
            disabled={page <= 1}
            clickHandler={onPrevious}
            text="Vorige"
        />

    <Button
        disabled={page >= totalPages}
        clickHandler={onNext}
        text="Volgende"
    />
        </>
    );
}

Pagination.propTypes={
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired
};

export default Pagination;