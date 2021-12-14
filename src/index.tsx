import React, {
  cloneElement,
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import './Popup.css';

export type Props = {
  children: ReactNode,
  toggler: ReactElement
}

const Popup: FC<Props> = ({ children, toggler }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [root, setRoot] = useState<string>('#root');
  const popupRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (popupRef.current && togglerRef.current) {
      const x = togglerRef.current.offsetLeft
        + togglerRef.current.offsetWidth / 2
        - popupRef.current.offsetWidth / 2;
      const y = togglerRef.current.offsetTop + togglerRef.current.offsetHeight;
      setPosition({
        x,
        y,
      });
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const app = (newRoot: string) => {
    setRoot(newRoot);
  };

  const togglePopup = () => {
    setOpen((state) => !state);
  };

  return (
    <>
      {cloneElement(toggler, {
        onClick: togglePopup,
        ref: togglerRef,
      })}
      {createPortal(
        <>
          <div
            className={`popup ${open && 'open'}`}
            ref={popupRef}
            style={{
              top: position.y,
              left: position.x,
            }}
          >
            {children}
          </div>
          <div
            className={`popup-background ${open && 'active'}`}
            onClick={togglePopup}
            role="button"
            aria-hidden="true"
          />
        </>,
        document.querySelector(root) as Element,
      )}
    </>
  );
};

export default Popup;
