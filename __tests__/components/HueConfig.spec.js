import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HueConfig from '../../app/components/HueConfig';

describe('HueConfig Component', () => {
  test('has correct default state', () => {
    const tree = shallow(<HueConfig />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
