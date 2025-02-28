import { createContext, useState } from "react"

const ButtonContext = createContext();


function ButtonProvider({children}) {
    const [buttonValue, setButtonValue] = useState('');

  return (
    <ButtonContext.Provider value={{buttonValue, setButtonValue}}>
      {children}
    </ButtonContext.Provider>
  )

}

export {ButtonContext, ButtonProvider}