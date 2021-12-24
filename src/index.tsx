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
  backgroundClassName?: string,
  distanceFromToggler?: number,
  // distanceFromEdges?: number,
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
  backgroundClassName,
  // distanceFromEdges = 0,
  distanceFromToggler = 12,
  fixed = false,
  arrow = true,
  arrowSize = 12,
  root = '#root',
}) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [arrowPos, setArrowPos] = useState({ top: '', left: '' });
  const [enableScroll, disableScroll] = useDisableScroll();

  const popupRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLElement>(null);

  const getPosition = () => {
    if (popupRef.current && togglerRef.current) {
      let top = 0;
      let left = 0;
      let arrowTop = '';
      let arrowLeft = '';

      switch (position[0]) {
        case 'center': {
          left = togglerRef.current.offsetLeft
            + togglerRef.current.offsetWidth / 2
            - popupRef.current.offsetWidth / 2;
          arrowLeft = '50%';
          break;
        }
        case 'left': {
          left = togglerRef.current.offsetLeft
            - popupRef.current.offsetWidth
            - distanceFromToggler;
          arrowLeft = '100%';
          break;
        }
        case 'midleft': {
          left = togglerRef.current.offsetLeft
            + togglerRef.current.offsetWidth
            - popupRef.current.offsetWidth;
          arrowLeft = `${popupRef.current.offsetWidth - arrowSize * 2}px`;
          break;
        }
        case 'right': {
          left = togglerRef.current.offsetLeft
            + togglerRef.current.offsetWidth
            + distanceFromToggler;
          arrowLeft = `-${arrowSize + 1}px`;
          break;
        }
        case 'midright': {
          left = togglerRef.current.offsetLeft;
          arrowLeft = `${arrowSize * 2}px`;
          break;
        }
        default: {
          throw new Error('Position on the horizontal axis : wrong value provided.');
        }
      }

      switch (position[1]) {
        case 'center': {
          top = togglerRef.current.offsetTop
            + togglerRef.current.offsetHeight / 2
            - popupRef.current.offsetHeight / 2;
          arrowTop = '50%';
          break;
        }
        case 'top': {
          top = togglerRef.current.offsetTop
            - popupRef.current.offsetHeight
            - distanceFromToggler;
          arrowTop = '100%';
          break;
        }
        case 'midtop': {
          top = togglerRef.current.offsetTop
            + togglerRef.current.offsetHeight
            - popupRef.current.offsetHeight;
          arrowTop = `${popupRef.current.offsetHeight - arrowSize * 2}px`;
          break;
        }
        case 'bottom': {
          top = togglerRef.current.offsetTop
            + togglerRef.current.offsetHeight
            + distanceFromToggler;
          arrowTop = `-${arrowSize + 1}px`;
          break;
        }
        case 'midbottom': {
          top = togglerRef.current.offsetTop;
          arrowTop = `${arrowSize * 2}px`;
          break;
        }
        default: {
          throw new Error('Position on the vertical axis : wrong value provided.');
        }
      }

      /*
      WIP: Handle popup not going beyond edges of the screen
      if (left < distanceFromEdges) {
        left = distanceFromEdges;
      } else if (left + popupRef.current.offsetWidth > window.innerWidth - distanceFromEdges) {
        left -= left + popupRef.current.offsetWidth - (window.innerWidth - distanceFromEdges);
      }
      */

      setPos({ top, left });
      setArrowPos({ top: arrowTop, left: arrowLeft });
    }
  };

  useEffect(() => {
    getPosition();

    window.addEventListener('resize', getPosition);

    document.querySelectorAll('[data-close]').forEach((closeElement) => {
      closeElement.addEventListener('click', () => setOpen(false));
    });

    return () => {
      window.removeEventListener('resize', getPosition);

      document.querySelectorAll('[data-close]').forEach((closeElement) => {
        closeElement.removeEventListener('click', () => setOpen(false));
      });

      enableScroll();
    };
  }, []);

  useEffect(() => {
    if (open) {
      getPosition();
      if (noScroll && !fixed) {
        disableScroll();
      }
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
            style={pos}
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
              className={`cpopup-background ${backgroundClassName || 'default'} ${open && 'active'}`}
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
