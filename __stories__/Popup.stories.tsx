import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react';
import Popup, { Props } from '../src';
import '../src/index.scss';

const meta: Meta = {
  title: 'Popup',
  component: Popup,
};

export default meta;

const Template: Story<Props> = (args) => (
  <Popup
    {...args}
    toggler={
      <button type="button" style={{ marginLeft: '50%' }}>Toggler</button>
    }
  >
    <button type="button" data-close>Close</button>
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, magnam?</div>
  </Popup>
);

export const Default = Template.bind({});
