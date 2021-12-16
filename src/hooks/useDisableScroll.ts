import { useCallback, useEffect, useState } from 'react';

const useDisableScroll = (disableScroll: boolean) => {
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const disable = useCallback(() => {
    window.scrollTo(position.x, position.y);
  }, []);

  useEffect(() => {
    if (disableScroll) {
      setPosition({ x: window.scrollX, y: window.scrollY });
      window.addEventListener('scroll', disable, true);
    } else {
      window.removeEventListener('scroll', disable, true);
    }
  }, [disableScroll]);
};

export default useDisableScroll;
