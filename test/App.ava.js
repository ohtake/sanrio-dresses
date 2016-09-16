import 'enzyme/withDom';

import React from 'react';

import test from 'ava';
import { shallow } from 'enzyme';

import App from '../src/App.jsx';

test('<App /> should be loaded', t => {
  const wrapper = shallow(<App params={{}} />);
  const instance = wrapper.instance();
  t.not(instance, null);
});