import { shallow, mount } from "enzyme";
import SelfServicePage from './components/selfServicePage/SelfServicePage';
import React from 'react';
import InviterSelfService
  , {PendingRequestsTable} from './components/selfServicePage/InviterSelfService';
import InviterForm from './components/selfServicePage/InviterForm';

test('tautology', () => {
  expect(true).toBeTruthy();
});

/* Self-service page unit test */

test('Self service page contains Back button', () => {
  const wrapper = shallow(<SelfServicePage/>);
  const buttonBack = "Back";
  expect(wrapper.contains(buttonBack)).toEqual(true);
});

test('Inviter self service page contains all elements', () => {
  const wrapper = shallow(<InviterSelfService/>);
  const inviterForm = <InviterForm/>;
  const pendingRequestsTable = <PendingRequestsTable/>;
  expect(wrapper.contains(inviterForm)).toEqual(true);
  expect(wrapper.contains(pendingRequestsTable)).toEqual(true);
});
