import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Button from "../../app/components/Button";
console.log(renderer);

describe("Button Component", () => {
  test("has correct default state", () => {
    const tree = shallow(<Button />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  test("has correct state when disabled", () => {
    const props = {
      isDisabled: true
    };
    const tree = shallow(<Button {...props} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
