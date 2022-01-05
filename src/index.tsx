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
  modal?: boolean,
};

const Popup: FC<Props> = ({
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
  modal = false,
}) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number, left: number, maxWidth: string | number }>({ top: 0, left: 0, maxWidth: 'auto' });
  const [arrowPos, setArrowPos] = useState({ top: '', left: '' });
  const [enableScroll, disableScroll] = useDisableScroll();

  const popupRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLElement>(null);
  const mouseOnPopup = useRef(false);

  const getPosition = () => {
    if (popupRef.current && togglerRef.current) {
      if (modal) {
        const top = window.innerHeight / 2
          - popupRef.current.offsetHeight / 2;
        const left = window.innerWidth / 2
          - popupRef.current.offsetWidth / 2;

        const maxWidth = popupRef.current.offsetWidth > window.innerWidth ? window.innerWidth - (distanceFromEdges * 2) : 'auto';

        setPos({ top, left, maxWidth });
      } else {
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

        const togglerTopRelativeToViewport = fixed
          ? togglerRef.current?.getBoundingClientRect().top
          : togglerRef.current?.offsetTop;

        switch (position[1]) {
          case 'center': {
            top = togglerTopRelativeToViewport
              + togglerRef.current.offsetHeight / 2
              - popupRef.current.offsetHeight / 2;
            arrowTop = '50%';
            break;
          }
          case 'top': {
            top = togglerTopRelativeToViewport
              - popupRef.current.offsetHeight
              - distanceFromToggler;
            arrowTop = '100%';
            break;
          }
          case 'midtop': {
            top = togglerTopRelativeToViewport
              + togglerRef.current.offsetHeight
              - popupRef.current.offsetHeight;
            arrowTop = `${popupRef.current.offsetHeight - arrowSize * 2}px`;
            break;
          }
          case 'bottom': {
            top = togglerTopRelativeToViewport
              + togglerRef.current.offsetHeight
              + distanceFromToggler;
            arrowTop = `-${arrowSize + 1}px`;
            break;
          }
          case 'midbottom': {
            top = togglerTopRelativeToViewport;
            arrowTop = `${arrowSize * 2}px`;
            break;
          }
          default: {
            throw new Error('Position on the vertical axis : wrong value provided.');
          }
        }

        let maxWidth: string | number = 'auto';
        if (left < distanceFromEdges) {
          maxWidth = popupRef.current.offsetWidth - Math.abs(left) - distanceFromEdges;
          left = distanceFromEdges;
        } else if (left + popupRef.current.offsetWidth > window.innerWidth - distanceFromEdges) {
          maxWidth = popupRef.current.offsetWidth - window.innerWidth - distanceFromEdges;
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
    getPosition();

    window.addEventListener('resize', getPosition);

    document.querySelectorAll('[data-close]').forEach((closeElement) => {
      closeElement.addEventListener('click', closePopup);
    });

    return () => {
      window.removeEventListener('resize', getPosition);

      document.querySelectorAll('[data-close]').forEach((closeElement) => {
        closeElement.removeEventListener('click', closePopup);
      });

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

  const renderPopup = () => (
    <>
      <div
        className={`cpopup ${className || 'default'} ${(fixed || modal) && 'fixed'} ${open && 'open'}`}
        ref={popupRef}
        style={pos}
        onMouseEnter={toggleOn === 'hover' ? () => setMouseOnPopup(true) : () => null}
        onMouseLeave={toggleOn === 'hover' ? handleMouseLeave : () => null}
      >
        {arrow && !modal && (
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
      {cloneElement(
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
      {portal
        ? document.querySelector(root) && createPortal(
          renderPopup(),
          document.querySelector(root) as Element,
        )
        : renderPopup()}
    </>
  );
};

export default Popup;
