import React, { FC, useState } from 'react';
import './Popup.css';

export type Props = {
  initial: number
}

const Popup: FC<Props> = ({ initial }) => {
  const [count, setCount] = useState<number>(initial);

  return (
    <button
      type="button"
      onClick={() => setCount((state) => state + 1)}
    >
      {count}
    </button>
  );
};

export default Popup;
