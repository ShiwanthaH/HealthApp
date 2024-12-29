import React, { createContext, Dispatch, SetStateAction, useState } from "react";

interface UserContextType {
    user: string | null;
    setUser: Dispatch<SetStateAction<any>>;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

export const UserProvider = ({ children } : { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
