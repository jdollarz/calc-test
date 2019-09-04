import React from 'react';
import PropTypes from 'prop-types';
import './CalculatorButton.css';

const CalculatorButton = ({ value, buttonType, onClick }) => {
    const styleClass = buttonType
        ? `calculator-button calculator-button--${buttonType}`
        : 'calculator-button';
    return (
        <button className={`${styleClass}`} onClick={() => onClick(value)}>
            {value}
        </button>
    );
};

CalculatorButton.propTypes = {
    buttonType: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default CalculatorButton;
