import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents unit testing', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render text input', () =>{
      expect(NumberOfEventsWrapper.find('.newValue')).toHaveLength(1);
  });
})