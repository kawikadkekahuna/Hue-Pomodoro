import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Timer from '../../app/components/Timer';

describe('Timer Component', () => {
  test('has correct default state', () => {
    const tree = shallow(<Timer />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  test('correctly returns seconds text', () => {
    const tree = shallow(<Timer />);
    expect(tree.instance().getSeconds(60)).toEqual('00');
    expect(tree.instance().getSeconds(59)).toEqual(59);
  });
});
