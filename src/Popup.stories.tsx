import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react';
import Popup, { Props } from './index';
import './Popup.css';

const meta: Meta = {
  title: 'Popup',
  component: Popup,
};

export default meta;

const Template: Story<Props> = (args) => (
  <Popup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  initial: 1,
};
