import React, {
  FC,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './Popup.css';

export type Props = {
  children: ReactNode,
  toggler: ReactElement | FC
}

const Popup: FC<Props> = ({ children, toggler }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [root, setRoot] = useState<string>('#root');

  // eslint-disable-next-line no-unused-vars
  const app = (newRoot: string) => {
    setRoot(newRoot);
  };

  const togglePopup = () => {
    setOpen((state) => !state);
  };

  return (
    <>
      <span
        onClick={togglePopup}
        onKeyPress={togglePopup}
        role="button"
        tabIndex={0}
      >
        {toggler}
      </span>
      {createPortal(
        <div className={open ? 'open' : ''}>
          {children}
        </div>,
        document.querySelector(root) as Element,
      )}
    </>
  );
};

export default Popup;
