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
import useDisableScroll from './hooks/useDisableScroll';
import './index.scss';

export type Props = {
  children: ReactNode,
  toggler: ReactElement,
  position?: [
    'center' | 'left' | 'midleft' | 'right' | 'midright',
    'center' | 'top' | 'midtop' | 'bottom' | 'midbottom',
  ],
  toggleOn?: 'click' | 'hover',
  disableScroll?: boolean,
  className?: string,
  distanceFromEdges?: number,
  distanceFromToggler?: number,
  fixed?: boolean,
  arrow?: boolean,
  root?: string,
}

const Popup: FC<Props> = ({
  children,
  toggler,
  position = ['center', 'bottom'],
  toggleOn = 'click',
  disableScroll = true,
  className,
  distanceFromEdges = 0,
  distanceFromToggler = 12,
  fixed = false,
  arrow = true,
  root = '#root',
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [pos, setPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  if (disableScroll && !fixed) {
    useDisableScroll(open);
  }

  const popupRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLElement>(null);

  const getPosition = () => {
    if (popupRef.current && togglerRef.current) {
      let x = 0;
      let y = 0;

      switch (position[0]) {
        case 'center': {
          x = togglerRef.current.offsetLeft
            + togglerRef.current.offsetWidth / 2
            - popupRef.current.offsetWidth / 2;
          break;
        }
        case 'left': {
          x = togglerRef.current.offsetLeft
            - popupRef.current.offsetWidth
            - distanceFromToggler;
          break;
        }
        case 'midleft': {
          x = togglerRef.current.offsetLeft
            + togglerRef.current.offsetWidth
            - popupRef.current.offsetWidth;
          break;
        }
        case 'right': {
          x = togglerRef.current.offsetLeft
            + togglerRef.current.offsetWidth
            + distanceFromToggler;
          break;
        }
        case 'midright': {
          x = togglerRef.current.offsetLeft;
          break;
        }
        default: {
          throw new Error('Position on the horizontal axis : wrong value provided.');
        }
      }

      switch (position[1]) {
        case 'center': {
          y = togglerRef.current.offsetTop
            + togglerRef.current.offsetHeight / 2
            - popupRef.current.offsetHeight / 2;
          break;
        }
        case 'top': {
          y = togglerRef.current.offsetTop
            - popupRef.current.offsetHeight
            - distanceFromToggler;
          break;
        }
        case 'midtop': {
          y = togglerRef.current.offsetTop
            + togglerRef.current.offsetHeight
            - popupRef.current.offsetHeight;
          break;
        }
        case 'bottom': {
          y = togglerRef.current.offsetTop
            + togglerRef.current.offsetHeight
            + distanceFromToggler;
          break;
        }
        case 'midbottom': {
          y = togglerRef.current.offsetTop;
          break;
        }
        default: {
          throw new Error('Position on the vertical axis : wrong value provided.');
        }
      }

      /* Handle popup not going beyond edges of the screen */
      if (x < distanceFromEdges) {
        x = distanceFromEdges;
      } else if (x + popupRef.current.offsetWidth > window.innerWidth - distanceFromEdges) {
        x -= x + popupRef.current.offsetWidth - (window.innerWidth - distanceFromEdges);
      }

      setPos({ x, y });
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

  const openPopup = () => setOpen(true);

  const closePopup = () => setOpen(false);

  const togglePopup = () => setOpen((state) => !state);

  return (
    <>
      {cloneElement(
        toggler,
        toggleOn === 'click'
          ? {
            onClick: togglePopup,
            ref: togglerRef,
          }
          : {
            onMouseEnter: openPopup,
            onMouseLeave: closePopup,
            ref: togglerRef,
          },
      )}
      {createPortal(
        <>
          <div
            className={`cpopup ${className || 'default'} ${fixed && 'fixed'} ${open && 'open'}`}
            ref={popupRef}
            style={{
              top: pos.y,
              left: pos.x,
            }}
          >
            {arrow && (
              <div className={`cpopup-arrow ${'top'}`} />
            )}
            {children}
          </div>
          {toggleOn === 'click' && (
            <div
              className={`cpopup-background ${!className && 'default'} ${open && 'active'}`}
              onClick={togglePopup}
              role="button"
              aria-hidden="true"
            />
          )}
        </>,
        document.querySelector(root) as Element,
      )}
    </>
  );
};

export default Popup;
