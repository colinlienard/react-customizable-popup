import React, {
  createContext,
  FC,
  useMemo,
} from 'react';

export const Context = createContext({ root: '#root' });

type ContextProps = {
  root: string,
};

const PopupProvider: FC<ContextProps> = ({ children, root }) => {
  const value = useMemo(() => ({ root }), []);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default PopupProvider;
