import React, {
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import useDisableScroll from './useDisableScroll';
import PopupProvider, { Context } from './context';
import './index.scss';

export type PopupHandle = {
  open: () => void,
  close: () => void,
  toggle: () => void,
};

export type PopupProps = {
  children: ReactNode,
  toggler?: ReactElement,
  position?: [
    'center' | 'left' | 'midleft' | 'right' | 'midright',
    'center' | 'top' | 'midtop' | 'bottom' | 'midbottom',
  ] | 'modal',
  toggleOn?: 'click' | 'hover',
  backdrop?: boolean,
  noScroll?: boolean,
  className?: string,
  backdropClassName?: string,
  distanceFromToggler?: number,
  distanceFromEdges?: number,
  fixed?: boolean,
  arrow?: boolean,
  arrowSize?: number,
  root?: string,
  onOpen?: () => void,
  onClose?: () => void,
  portal?: boolean,
};

const Popup = forwardRef<PopupHandle, PopupProps>(({
  children,
  toggler,
  position = ['center', 'bottom'],
  toggleOn = 'click',
  backdrop = true,
  noScroll = true,
  className,
  backdropClassName,
  distanceFromEdges = 0,
  distanceFromToggler = 12,
  fixed = false,
  arrow = true,
  arrowSize = 12,
  root = '#root',
  onOpen,
  onClose,
  portal = true,
}, forwardedRef) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number, left: number, maxWidth: string | number }>({ top: 0, left: 0, maxWidth: 'auto' });
  const [arrowPos, setArrowPos] = useState({ top: '', left: '' });
  const [mounted, setMounted] = useState(false);
  const [enableScroll, disableScroll] = useDisableScroll();

  const popupRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLElement>(null);
  const mouseOnPopup = useRef(false);

  const { globalRoot } = useContext(Context);

  const getPosition = () => {
    if (popupRef.current) {
      const popupWidth = popupRef.current.offsetWidth;
      const popupHeight = popupRef.current.offsetHeight;

      if (position === 'modal') {
        const top = window.innerHeight / 2 - popupHeight / 2;
        const left = window.innerWidth / 2 - popupWidth / 2;

        const maxWidth = popupWidth > window.innerWidth ? window.innerWidth - (distanceFromEdges * 2) : 'auto';

        setPos({ top, left, maxWidth });
      } else if (togglerRef.current) {
        const {
          top: togglerTop,
          left: togglerLeft,
          width: togglerWidth,
          height: togglerHeight,
        } = togglerRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;
        let arrowTop = '';
        let arrowLeft = '';

        switch (position[0]) {
          case 'center': {
            left = togglerLeft + togglerWidth / 2 - popupWidth / 2;
            arrowLeft = '50%';
            break;
          }
          case 'left': {
            left = togglerLeft - popupWidth - distanceFromToggler;
            arrowLeft = '100%';
            break;
          }
          case 'midleft': {
            left = togglerLeft + togglerWidth - popupWidth;
            arrowLeft = `${popupWidth - arrowSize * 2}px`;
            break;
          }
          case 'right': {
            left = togglerLeft + togglerWidth + distanceFromToggler;
            arrowLeft = `-${arrowSize}px`;
            break;
          }
          case 'midright': {
            left = togglerLeft;
            arrowLeft = `${arrowSize * 2}px`;
            break;
          }
          default: {
            throw new Error('Position on the horizontal axis : wrong value provided.');
          }
        }

        switch (position[1]) {
          case 'center': {
            top = togglerTop + togglerHeight / 2 - popupHeight / 2;
            arrowTop = '50%';
            break;
          }
          case 'top': {
            top = togglerTop - popupHeight - distanceFromToggler;
            arrowTop = '100%';
            break;
          }
          case 'midtop': {
            top = togglerTop + togglerHeight - popupHeight;
            arrowTop = `${popupHeight - arrowSize * 2}px`;
            break;
          }
          case 'bottom': {
            top = togglerTop + togglerHeight + distanceFromToggler;
            arrowTop = `-${arrowSize}px`;
            break;
          }
          case 'midbottom': {
            top = togglerTop;
            arrowTop = `${arrowSize * 2}px`;
            break;
          }
          default: {
            throw new Error('Position on the vertical axis : wrong value provided.');
          }
        }

        let maxWidth: string | number = 'auto';
        if (left < distanceFromEdges) {
          maxWidth = popupWidth - Math.abs(left) - distanceFromEdges;
          left = distanceFromEdges;
        } else if (left + popupWidth > window.innerWidth - distanceFromEdges) {
          maxWidth = popupWidth - window.innerWidth - distanceFromEdges;
        }

        setPos({ top, left, maxWidth });
        setArrowPos({ top: arrowTop, left: arrowLeft });
      }
    }
  };

  const openPopup = () => {
    getPosition();
    setOpen(true);
    mouseOnPopup.current = true;
    if (onOpen) {
      onOpen();
    }
  };

  const closePopup = () => {
    setOpen(false);
    mouseOnPopup.current = false;
    if (onClose) {
      onClose();
    }
  };

  const togglePopup = () => {
    setOpen((state) => {
      if (state && onClose) {
        mouseOnPopup.current = false;
        onClose();
      } else {
        mouseOnPopup.current = true;
        getPosition();
        if (onOpen) {
          onOpen();
        }
      }
      return !state;
    });
  };

  const handleEchapKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && open) {
      closePopup();
    }
  };

  const setMouseOnPopup = (value: boolean) => {
    mouseOnPopup.current = value;
  };

  const handleMouseLeave = () => {
    setMouseOnPopup(false);
    setTimeout(() => {
      if (!mouseOnPopup.current) {
        closePopup();
      }
    }, 300);
  };

  useEffect(() => {
    /* Create the portal then select elements */
    (async () => {
      await setMounted(true);

      document.querySelectorAll('[data-close]').forEach((closeElement) => {
        closeElement.addEventListener('click', closePopup);
      });
    })();

    getPosition();

    window.addEventListener('resize', getPosition);

    return () => {
      document.querySelectorAll('[data-close]').forEach((closeElement) => {
        closeElement.removeEventListener('click', closePopup);
      });

      window.removeEventListener('resize', getPosition);

      enableScroll();
    };
  }, []);

  useEffect(() => {
    if (noScroll && !fixed) {
      if (open) {
        disableScroll();
      } else {
        enableScroll();
      }
    }

    window.addEventListener('keydown', handleEchapKey);

    return () => {
      window.removeEventListener('keydown', handleEchapKey);
    };
  }, [open]);

  useImperativeHandle(forwardedRef, () => ({
    open: openPopup,
    close: closePopup,
    toggle: togglePopup,
  }));

  const renderPopup = () => (
    <>
      <div
        className={`cpopup ${className || 'default'} ${(fixed || (position === 'modal')) && 'fixed'} ${open && 'open'}`}
        ref={popupRef}
        style={pos}
        onMouseEnter={toggleOn === 'hover' ? () => setMouseOnPopup(true) : () => null}
        onMouseLeave={toggleOn === 'hover' ? handleMouseLeave : () => null}
      >
        {arrow && position !== 'modal' && (
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
      {toggleOn === 'click' && backdrop && (
        <div
          className={`cpopup-backdrop ${backdropClassName || 'default'} ${open && 'open'}`}
          onClick={closePopup}
          role="button"
          aria-hidden="true"
        />
      )}
    </>
  );

  return (
    <>
      {toggler && cloneElement(
        toggler,
        toggleOn === 'click'
          ? {
            onClick: togglePopup,
            ref: togglerRef,
          }
          : {
            onMouseEnter: openPopup,
            onMouseLeave: handleMouseLeave,
            ref: togglerRef,
          },
      )}
      {portal ? mounted && createPortal(
        renderPopup(),
        document.querySelector(globalRoot || root) as Element,
      ) : renderPopup()}
    </>
  );
});

export default Popup;
export { PopupProvider };
