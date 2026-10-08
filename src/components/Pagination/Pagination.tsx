import styles from './Pagination.module.css';
import PropTypes from "prop-types";
import Button from '../Button/Button';

type PaginationProps = {
    page: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
};

function Pagination({page, totalPages, onPrevious, onNext}:PaginationProps) {
    return (
        <div className={styles["page-navigation-button-wrapper"]}>
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
        </div>
    );
}

export default Pagination;