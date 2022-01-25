import React, { useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react';
import Popup, { PopupHandle, PopupProps } from '../src';
import '../src/index.scss';

const meta: Meta = {
  title: 'React Customizable Popup',
  component: Popup,
};

export default meta;

const Template: Story<PopupProps> = (args) => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Popup
      {...args}
      toggler={(
        <button type="button">Toggler</button>
      )}
    >
      <button type="button" data-close>Close</button>
      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, magnam?</div>
    </Popup>
  </div>
);

export const Default = Template.bind({});

export const PosTop = Template.bind({});
PosTop.args = {
  position: ['midleft', 'top'],
};

export const PosLeft = Template.bind({});
PosLeft.args = {
  position: ['left', 'midbottom'],
};

export const PosRight = Template.bind({});
PosRight.args = {
  position: ['right', 'center'],
};

export const Modal = Template.bind({});
Modal.args = {
  modal: true,
};

export const Hover = Template.bind({});
Hover.args = {
  toggleOn: 'hover',
};

export const Fixed = Template.bind({});
Fixed.args = {
  fixed: true,
};

export const NoBackdrop = Template.bind({});
NoBackdrop.args = {
  backdrop: false,
};

export const NoArrow = Template.bind({});
NoArrow.args = {
  arrow: false,
};

export const BigArrow = Template.bind({});
BigArrow.args = {
  arrowSize: 20,
};

export const ForwardRef: Story = () => {
  const popupRef = useRef<PopupHandle>(null);

  const togglePopup = () => {
    if (popupRef.current) {
      popupRef.current.toggle();
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Popup
        toggler={(
          <button type="button">Toggler</button>
        )}
        backdrop={false}
        ref={popupRef}
      >
        <button type="button" data-close>Close</button>
        <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, magnam?</div>
      </Popup>
      <button type="button" onClick={togglePopup}>Toggle popup with a ref</button>
    </div>
  );
};
