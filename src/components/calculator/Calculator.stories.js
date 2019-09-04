import React from 'react';
import { storiesOf } from '@storybook/react';
import Calculator from './Calculator';

storiesOf('Calculator', module).add('calculator', () => {
    return (
        <div style={{ width: '375px', height: '810px' }}>
            <Calculator />
        </div>
    );
});
