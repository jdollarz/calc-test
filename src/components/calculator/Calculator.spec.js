import React from 'react';
import { mount } from 'enzyme';
import Calculator from './Calculator';
import CalculatorButton from './calculator-button/CalculatorButton';
import CalculatorScreen from './calculator-screen/CalculatorScreen';

let wrapper;
const calculatorButton = value => {
    const calculatorButtons = wrapper.find(CalculatorButton);
    return calculatorButtons.find(`[value="${value}"]`);
};

const calculatorScreen = () => wrapper.find(CalculatorScreen);

describe('<Calculator />', () => {
    beforeEach(() => {
        wrapper = mount(<Calculator />);
    });

    test('it renders', () => {
        expect(wrapper.find('.calculator').length).toEqual(1);
    });

    test('clicking on  a number button adds the number to screen', () => {
        calculatorButton('9').simulate('click');
        expect(calculatorScreen().text()).toEqual('9');
    });

    test('clicking on number button 17 times only adds the first 15 characters to the screen', () => {
        const expectedResult = '888888888888888';
        [...Array(17)].map(() => calculatorButton('8').simulate('click'));
        expect(calculatorScreen().text()).toEqual(expectedResult);
    });

    test('clicking on number followed by an operator button leaves the number on the screeen screen', () => {
        const expectedResult = '8';
        calculatorButton('8').simulate('click');
        calculatorButton('+').simulate('click');
        expect(calculatorScreen().text()).toEqual(expectedResult);
    });

    test('clicking on number followed by an operator button followed by a number button leaves the 2nd number on the screeen screen', () => {
        const expectedResult = '9';

        calculatorButton('8').simulate('click');
        calculatorButton('+').simulate('click');
        calculatorButton('9').simulate('click');
        expect(calculatorScreen().text()).toEqual(expectedResult);
    });

    test('selecting 8 + 9  = displays the result 17 on the screen', () => {
        const expectedResult = '17';

        calculatorButton('8').simulate('click');
        calculatorButton('+').simulate('click');
        calculatorButton('9').simulate('click');
        calculatorButton('=').simulate('click');
        expect(calculatorScreen().text()).toEqual(expectedResult);
    });

    test('selecting = multiple time without previously selectinga a number and operator should  not crash the app', () => {
        const expectedResult = '0';
        calculatorButton('=').simulate('click');
        calculatorButton('=').simulate('click');
        expect(calculatorScreen().text()).toEqual(expectedResult);
    });

    test('selecting 8 + 9 + 3  = displays the result 20 on the screen', () => {
        const expectedResult = '20';

        calculatorButton('8').simulate('click'); //8
        calculatorButton('+').simulate('click'); // +
        calculatorButton('9').simulate('click'); // 9

        calculatorButton('+').simulate('click'); // +
        calculatorButton('3').simulate('click'); //3
        calculatorButton('+').simulate('click'); // +

        expect(calculatorScreen().text()).toEqual(expectedResult);
    });

    test('selecting 8 - 9  = displays the result -1 on the screen', () => {
        const expectedResult = '-1';

        calculatorButton('8').simulate('click');
        calculatorButton('-').simulate('click');
        calculatorButton('9').simulate('click');
        calculatorButton('=').simulate('click');

        expect(calculatorScreen().text()).toEqual(expectedResult);
    });

    test('selecting 8 x 9  = displays the result 72 on the screen', () => {
        const expectedResult = '72';
        calculatorButton('8').simulate('click');
        calculatorButton('x').simulate('click');
        calculatorButton('9').simulate('click');
        calculatorButton('=').simulate('click');

        expect(calculatorScreen().text()).toEqual(expectedResult);
    });

    test('selecting 8 / 9  = displays the result 72 on the screen', () => {
        const expectedResult = '0.8888888888888';

        calculatorButton('8').simulate('click');
        calculatorButton('/').simulate('click');
        calculatorButton('9').simulate('click');
        calculatorButton('=').simulate('click');

        expect(calculatorScreen().text()).toEqual(expectedResult);
    });

    test('pressing dot (decimal point) when zero is on the screen displays the dot on the left of zero', () => {
        const expected = '0.';
        calculatorButton('.').simulate('click');
        expect(calculatorScreen().text()).toEqual(expected);
    });

    test('pressing dot multiple times displays only one dot on the screen', () => {
        const expected = '0.';
        calculatorButton('.').simulate('click');
        expect(calculatorScreen().text()).toEqual(expected);
    });
});
