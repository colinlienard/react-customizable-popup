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
import useBlockScroll from './hooks/useBlockScroll';
import './index.css';

const distanceFromEdge = 0;

export type Props = {
  children: ReactNode,
  toggler: ReactElement
}

const Popup: FC<Props> = ({ children, toggler }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [root, setRoot] = useState<string>('#root');

  useBlockScroll(open);

  const popupRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLElement>(null);

  const getPosition = () => {
    if (popupRef.current && togglerRef.current) {
      let x = togglerRef.current.offsetLeft
        + togglerRef.current.offsetWidth / 2
        - popupRef.current.offsetWidth / 2;
      if (x < distanceFromEdge) {
        x = distanceFromEdge;
      } else if (x + popupRef.current.offsetWidth > window.innerWidth - distanceFromEdge) {
        x -= x + popupRef.current.offsetWidth - (window.innerWidth - distanceFromEdge);
      }
      const y = togglerRef.current.offsetTop + togglerRef.current.offsetHeight;
      setPosition({
        x,
        y,
      });
    }
  };

  useEffect(() => {
    getPosition();

    window.addEventListener('resize', () => {
      getPosition();
    });

    document.querySelectorAll('[data-close]').forEach((closeElement) => {
      closeElement.addEventListener('click', () => setOpen(false));
    });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const app = (newRoot: string) => {
    setRoot(newRoot);
  };

  const togglePopup = () => setOpen((state) => !state);

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
