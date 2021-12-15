import { useCallback, useEffect, useState } from 'react';

const useBlockScroll = (blockScroll: boolean) => {
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const block = useCallback(() => {
    window.scrollTo(position.x, position.y);
  }, []);

  useEffect(() => {
    if (blockScroll) {
      setPosition({ x: window.scrollX, y: window.scrollY });
      window.addEventListener('scroll', block, true);
    } else {
      window.removeEventListener('scroll', block, true);
    }
  }, [blockScroll]);
};

export default useBlockScroll;
