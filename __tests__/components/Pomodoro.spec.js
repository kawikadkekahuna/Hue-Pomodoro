import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Pomodoro from '../../app/components/Pomodoro';

describe('Pomodoro Component', () => {
  test('has correct default state', () => {
    const tree = shallow(<Pomodoro />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  test('can handle pomodoro event', () => {
    const props = {
      handlePomodoroEvent: jest.fn()
    };
    const tree = shallow(<Pomodoro {...props} />);
    tree.find('.pomodoroToggle').simulate('click');
    expect(props.handlePomodoroEvent).toHaveBeenCalled();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
