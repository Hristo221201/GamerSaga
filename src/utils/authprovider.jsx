import { createContext, useContext } from "react";

const Authcontext = createContext({
    isauth: false,
});

export default function Authprovide({children}) {
    return (
        <Authcontext.Provider value={{
            isauth,
        }}>
            {
                children
            }
        </Authcontext.Provider>
    );
}

export const useauth = () => useContext(Authcontext);