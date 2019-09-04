import React from 'react';
import { storiesOf } from '@storybook/react';
import CalculatorButton from './CalculatorButton';

storiesOf('CalculatorButton', module)
    .add('default button type', () => <CalculatorButton value="7" />)
    .add('operator button', () => (
        <CalculatorButton value="%" buttonType="operator" onClick={() => {}} />
    ))
    .add('function button', () => (
        <CalculatorButton value="AC" buttonType="function" onClick={() => {}}/>
    ))
    .add('long button', () => <CalculatorButton buttonType="long" value={0}  onClick={() => {}} />);
