import { useCallback, useRef } from 'react';

const useDisableScroll = () => {
  const position = useRef(0);

  const scrollToCurrentPos = useCallback(() => {
    window.scrollTo(0, position.current);
  }, [position]);

  const enableScroll = () => {
    window.removeEventListener('scroll', scrollToCurrentPos);
  };

  const disableScroll = () => {
    position.current = window.scrollY;
    window.addEventListener('scroll', scrollToCurrentPos);
  };

  return [enableScroll, disableScroll];
};

export default useDisableScroll;
