"use client"

import {createContext, useContext} from "react";

const SessionContext = createContext({});

const SessionContextProvider = ({children}) => {

    return <SessionContext.Provider
        value={{
            accessToken: "accessToken",
            refreshToken: "refreshToken"
        }}
    >
        {children}
    </SessionContext.Provider>
}

export default SessionContextProvider;

export const useSessionContext = () => {
    return useContext(SessionContext);
}