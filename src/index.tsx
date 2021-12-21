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
  background?: boolean,
  noScroll?: boolean,
  className?: string,
  distanceFromEdges?: number,
  distanceFromToggler?: number,
  fixed?: boolean,
  arrow?: boolean,
  arrowSize?: number,
  root?: string,
}

const Popup: FC<Props> = ({
  children,
  toggler,
  position = ['center', 'bottom'],
  toggleOn = 'click',
  background = true,
  noScroll = true,
  className,
  distanceFromEdges = 0,
  distanceFromToggler = 12,
  fixed = false,
  arrow = true,
  arrowSize = 12,
  root = '#root',
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [pos, setPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [arrowPos, setArrowPos] = useState<{ top: string, left: string }>({ top: '', left: '' });
  const [enableScroll, disableScroll] = useDisableScroll();

  const popupRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLElement>(null);

  const getPosition = () => {
    if (popupRef.current && togglerRef.current) {
      let x = 0;
      let y = 0;
      let top = '';
      let left = '';

      switch (position[0]) {
        case 'center': {
          x = togglerRef.current.offsetLeft
            + togglerRef.current.offsetWidth / 2
            - popupRef.current.offsetWidth / 2;
          left = '50%';
          break;
        }
        case 'left': {
          x = togglerRef.current.offsetLeft
            - popupRef.current.offsetWidth
            - distanceFromToggler;
          left = '100%';
          break;
        }
        case 'midleft': {
          x = togglerRef.current.offsetLeft
            + togglerRef.current.offsetWidth
            - popupRef.current.offsetWidth;
          left = `${popupRef.current.offsetWidth - arrowSize * 2}px`;
          break;
        }
        case 'right': {
          x = togglerRef.current.offsetLeft
            + togglerRef.current.offsetWidth
            + distanceFromToggler;
          left = `-${arrowSize + 1}px`;
          break;
        }
        case 'midright': {
          x = togglerRef.current.offsetLeft;
          left = `${arrowSize * 2}px`;
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
          top = '50%';
          break;
        }
        case 'top': {
          y = togglerRef.current.offsetTop
            - popupRef.current.offsetHeight
            - distanceFromToggler;
          top = '100%';
          break;
        }
        case 'midtop': {
          y = togglerRef.current.offsetTop
            + togglerRef.current.offsetHeight
            - popupRef.current.offsetHeight;
          top = `${popupRef.current.offsetHeight - arrowSize * 2}px`;
          break;
        }
        case 'bottom': {
          y = togglerRef.current.offsetTop
            + togglerRef.current.offsetHeight
            + distanceFromToggler;
          top = `-${arrowSize + 1}px`;
          break;
        }
        case 'midbottom': {
          y = togglerRef.current.offsetTop;
          top = `${arrowSize * 2}px`;
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
      setArrowPos({ top, left });
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

  useEffect(() => {
    if (open && noScroll && !fixed) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [open]);

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
              <div
                className={`cpopup-arrow ${position[0]} ${position[1]}`}
                style={{
                  ...arrowPos,
                  width: `${arrowSize}px`,
                  height: `${arrowSize}px`,
                }}
              />
            )}
            {children}
          </div>
          {toggleOn === 'click' && background && (
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
