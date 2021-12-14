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
  <Popup
    {...args}
    toggler={
      <button type="button">Toggler</button>
    }
  >
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, magnam?</p>
  </Popup>
);

export const Default = Template.bind({});
