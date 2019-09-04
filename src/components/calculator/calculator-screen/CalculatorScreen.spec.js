import React from 'react';
import { shallow } from 'enzyme';
import CalculatorScreen from './CalculatorScreen';

describe('<CalculatorScreen />', () => {
    test('it renders', () => {
        const wrapper = shallow(<CalculatorScreen />);
        expect(wrapper.find('.calculator-screen').length).toEqual(1);
    });

    test('it displays the props it is passed', () => {
        const props = { screenValue: '1234567' };
        const wrapper = shallow(<CalculatorScreen {...props} />);
        expect(wrapper.find('.calculator-screen').text()).toEqual('1234567');
    });
});
