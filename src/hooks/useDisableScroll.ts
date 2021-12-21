import { useCallback, useState } from 'react';

const useDisableScroll = () => {
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const scrollToCurrentPos = useCallback(() => {
    window.scrollTo(position.x, position.y);
  }, []);

  const enableScroll = () => {
    window.removeEventListener('scroll', scrollToCurrentPos, true);
  };

  const disableScroll = () => {
    setPosition({ x: window.scrollX, y: window.scrollY });
    window.addEventListener('scroll', scrollToCurrentPos, true);
  };

  return [enableScroll, disableScroll];
};

export default useDisableScroll;
