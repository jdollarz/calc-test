import React from 'react';
import CalculatorButton from './calculator-button/CalculatorButton';
import CalculatorScreen from './calculator-screen/CalculatorScreen';
import { ReactComponent as LogoComponent } from '../../images/ee-logo.svg';
import './Calculator.css';

const MAXIMUM_SCREEN_CHARACTERS = 15;
const operators = ['+', '-', '/', 'x'];

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.addToScreen = this.addToScreen.bind(this);
        this.state = {
            operand1: [],
            operand2: [],
            operator: '',
            operatorActive: false,
            currentScreenValue: [],
            firstDigit: false
        };
    }

    calculateValue() {
        const {
            operand1,
            operator,
            operatorActive,
            currentScreenValue
        } = this.state;
        if (!operand1.length || !currentScreenValue.length || !operator) {
            return null;
        }

        this.setState(state => {
            const result = this.calculateResult(
                operand1.join(''),
                state.operand2.join(''),
                operator
            );

            const newOperator = operatorActive ? operator : '';

            return {
                currentScreenValue: result,
                operand1: result,
                operand2: [],
                operator: newOperator,
                firstDigit: true
            };
        });
    }

    calculateResult(operand1, operand2, operator) {
        const calculate = {
            '+': (operand1, operand2) => Number(operand1) + Number(operand2),
            '-': (operand1, operand2) => Number(operand1) - Number(operand2),
            x: (operand1, operand2) => Number(operand1) * Number(operand2),
            '/': (operand1, operand2) => Number(operand1) / Number(operand2)
        };

        const result = calculate[operator](operand1, operand2);

        const numberString = String(result);

        if (numberString.length > MAXIMUM_SCREEN_CHARACTERS) {
            return [Number(numberString.substr(0, MAXIMUM_SCREEN_CHARACTERS))];
        }

        return [result];
    }

    setOperatorInActive() {
        this.setState(() => {
            return {
                operatorActive: false,
                operator: ''
            };
        });
    }

    setOperatorActive(value) {
        this.setState(() => {
            return {
                operatorActive: true,
                operator: value
            };
        });
    }

    addToScreen(value) {
        if (this.state.currentScreenValue.length < MAXIMUM_SCREEN_CHARACTERS) {
            this.setState(state => {
                const currentScreenValue = state.currentScreenValue.concat(
                    value
                );
                return {
                    currentScreenValue
                };
            });
        }
    }

    async setOperand2(value) {
        return await this.setState(() => ({ operand2: value }));
    }

    processCalculation() {
        const { currentScreenValue, operand1, operator } = this.state;
        if (currentScreenValue.length && operand1.length && operator) {
            const { currentScreenValue } = this.state;
            this.setOperand2([currentScreenValue.join('')]);
            this.calculateValue();
        }
    }

    updateScreen(value) {
        this.setState(state => {
            const currentScreenValue = [value];
            const operand1 = state.currentScreenValue;
            return {
                currentScreenValue,
                operand1,
                firstDigit: false
            };
        });
    }

    handleClick(value) {
        if (!isNaN(value)) {
            const { operand1, operator, firstDigit } = this.state;
            if (!operand1.length && operator) {
                return this.updateScreen(value);
            }
            if (operand1.length && operator && firstDigit) {
                return this.updateScreen(value);
            } else {
                return this.addToScreen(value);
            }
        }

        if (operators.includes(value)) {
            this.processCalculation();
            this.setOperatorActive(value);
        } else if (value === '=') {
            this.processCalculation();
            this.setOperatorInActive();
        } else if (value === 'AC') {
            // TODO:  this.clearAll();
        } else if (value === '%') {
            // TODO: this.calculatePercentage();
        } else if (value === '+/-') {
            // TODO: this.togglePlusMinus();
        } else if (value === '.') {
            const { currentScreenValue } = this.state;

            if (currentScreenValue.findIndex(item => item.includes('.')) > -1) {
                return null;
            }
            const screenValue = !currentScreenValue.length ? '0.' : '.';

            return this.addToScreen(screenValue);
        }
    }

    render() {
        const { currentScreenValue } = this.state;
        const screenValue = currentScreenValue.length
            ? currentScreenValue.join('')
            : '0';
        return (
            <div className="calculator">
                <div className="calculator-full-width-row">
                    <LogoComponent className="logo" />
                </div>

                <div className="calculator-full-width-row">
                    <CalculatorScreen screenValue={screenValue} />
                </div>

                <div className="calculator-row-button">
                    <CalculatorButton
                        value="AC"
                        buttonType="function"
                        onClick={this.handleClick}
                    />
                    <CalculatorButton
                        value="+/-"
                        buttonType="function"
                        onClick={this.handleClick}
                    />
                    <CalculatorButton
                        value="%"
                        buttonType="function"
                        onClick={this.handleClick}
                    />
                    <CalculatorButton
                        value="/"
                        buttonType="operator"
                        onClick={this.handleClick}
                    />
                </div>

                <div className="calculator-row-button">
                    <CalculatorButton value="9" onClick={this.handleClick} />
                    <CalculatorButton value="8" onClick={this.handleClick} />
                    <CalculatorButton value="7" onClick={this.handleClick} />
                    <CalculatorButton
                        value="x"
                        buttonType="operator"
                        onClick={this.handleClick}
                    />
                </div>

                <div className="calculator-row-button">
                    <CalculatorButton value="4" onClick={this.handleClick} />
                    <CalculatorButton value="5" onClick={this.handleClick} />
                    <CalculatorButton value="6" onClick={this.handleClick} />
                    <CalculatorButton
                        value="-"
                        buttonType="operator"
                        onClick={this.handleClick}
                    />
                </div>

                <div className="calculator-row-button">
                    <CalculatorButton value="1" onClick={this.handleClick} />
                    <CalculatorButton value="2" onClick={this.handleClick} />
                    <CalculatorButton value="3" onClick={this.handleClick} />
                    <CalculatorButton
                        value="+"
                        buttonType="operator"
                        onClick={this.handleClick}
                    />
                </div>

                <div className="calculator-row-button">
                    <CalculatorButton
                        value="0"
                        buttonType="long"
                        onClick={this.handleClick}
                    />

                    <CalculatorButton value="." onClick={this.handleClick} />
                    <CalculatorButton
                        value="="
                        buttonType="operator"
                        onClick={this.handleClick}
                    />
                </div>
            </div>
        );
    }
}

export default Calculator;
