import React, {
  createContext,
  FC,
  useMemo,
} from 'react';

export const Context = createContext<{ globalRoot: string | null }>({ globalRoot: null });

type ContextProps = {
  root: string,
};

const PopupProvider: FC<ContextProps> = ({ children, root }) => {
  const value = useMemo(() => ({ globalRoot: root }), []);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default PopupProvider;
