import { createContext } from "react";
import { useImmer } from "use-immer";

export const GlobalContext = createContext()

export function GlobalProvider({children}) {
    const [ planData, updatePlanData ] = useImmer({
            name: '',
            days: '',
            routine: [],
        })

    
    return (
        <GlobalContext.Provider value={[planData, updatePlanData]}>
        {children}
        </GlobalContext.Provider>
    )
}