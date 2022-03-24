import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  // Scenario 1
  test('When user hasn’t specified a number. 32 is the default number.', ({ given, when, then }) => { 
    let AppWrapper;
    given('the user is on the main page.', () => {
    AppWrapper = mount(<App />);
    });

    when('the user hasn’t specified a number of the events.', () => {
      expect(AppWrapper.state('numberOfEvents')).toBe(32);
      AppWrapper.update();
    });

    then('the search result will display the default number.', () => {
      expect(AppWrapper.state('numberOfEvents')).toBe(32);
    });
  });

  // Scenario 2
  test('User can change the number of events they want to see.', ({ given, when, then }) => {
    let AppWrapper;
    given('the user is on the main page.', () => {
      AppWrapper = mount(<App />);
    });

    when('the user put a number of events they want to see in the “Number of events” box.', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      const newNumber = { target: { value: 32} }
      NumberOfEventsWrapper.find("input").simulate("change", newNumber);
    });

    then('the specified number of events is displayed.', () => {
      expect(AppWrapper.state("numberOfEvents")).toEqual(32);
    });
  });
});