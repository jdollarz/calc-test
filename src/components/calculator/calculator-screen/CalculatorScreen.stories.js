import React from 'react';
import { storiesOf } from '@storybook/react';
import CalculatorScreen from './CalculatorScreen';

storiesOf('CalculatorScreen', module).add('default value', () => {
    const props = { screenValue: '1000' };
    return <CalculatorScreen {...props} />;
});
