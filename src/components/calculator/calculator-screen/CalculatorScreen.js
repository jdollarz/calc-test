import React from 'react';
import PropTypes from 'prop-types';
import './CalculatorScreen.css';

const CalculatorScreen = ({ screenValue }) => {
    return <div className="calculator-screen">{screenValue}</div>;
};

CalculatorScreen.propTypes = {
    screenValue: PropTypes.string
};

export default CalculatorScreen;
