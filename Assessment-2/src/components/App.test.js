import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('MyComponent', () => {
  it('should render App', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});