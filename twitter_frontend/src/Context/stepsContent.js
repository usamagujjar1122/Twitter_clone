import { createContext, useState } from "react";

export const StepsContext = createContext();

const StepsProvider = ({ children }) => {
  const [step, setstep] = useState(1);


  return (
    <StepsContext.Provider value={{ step, setstep }}>
      {children}
    </StepsContext.Provider>
  );
};

export default StepsProvider;