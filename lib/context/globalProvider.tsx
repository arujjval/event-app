import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

type GlobalContextType = {
  user: JwtPayload | null;
}

export const GlobalContext = createContext<GlobalContextType>({ user: null });

export const GlobalContextProvider = ({ children }: { children: ReactNode}) => {
  const [user, setUser] = useState<GlobalContextType>({ user: null });

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("user");

      if (token) {
        const decoded = jwtDecode(token);
        setUser({ user: decoded });
      }
    };

    fetchUser();
  })

  return (
    <GlobalContext.Provider value={user}>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);
