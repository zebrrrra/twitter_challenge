import { createContext, useContext, useState } from 'react';

const UpdateTagContext = createContext();

export const UpdateTagProvider = ({ children }) => {
  const [updateTag, setUpdateTag] = useState(false);

  return (
    <UpdateTagContext.Provider value={{ updateTag, setUpdateTag }}>
      {children}
    </UpdateTagContext.Provider>
  );
};

export const useUpdateTag = () => useContext(UpdateTagContext);
