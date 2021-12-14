import React, {
  FC,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import './Popup.css';

export type Props = {
  children: ReactNode,
  toggler: ReactElement
}

const Popup: FC<Props> = ({ children, toggler }) => {
  const [open, setOpen] = useState<boolean>(false);

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
      {open && (
        <div>
          {children}
        </div>
      )}
    </>
  );
};

export default Popup;
