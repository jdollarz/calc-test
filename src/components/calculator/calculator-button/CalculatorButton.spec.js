import React from 'react';
import { shallow } from 'enzyme';
import CalculatorButton from './CalculatorButton';

describe('<CalculatorButton />', () => {
    test('it renders', () => {
        const props = { value: '1', onClick: () => {} };
        const wrapper = shallow(<CalculatorButton {...props} />);
        expect(wrapper.find('.calculator-button').length).toEqual(1);
    });

    test('it renders the correct button when the buttonType prop is provided', () => {
        const props = { value: '2', buttonType: 'long', onClick: () => {} };
        const wrapper = shallow(<CalculatorButton {...props} />);
        expect(wrapper.find('.calculator-button').length).toEqual(1);
        expect(wrapper.find('.calculator-button--long').length).toEqual(1);
    });

    test('clicking on the CalculatorButton calls the onClick function', () => {
        const onClick = jest.fn();
        const props = { value: '3', onClick };
        const wrapper = shallow(<CalculatorButton {...props} />);
        wrapper.simulate('click');
        expect(onClick).toBeCalledWith('3');
    });
});
