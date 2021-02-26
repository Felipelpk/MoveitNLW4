import { createContext } from 'react'

interface TestContextData {

}

export const TestContext = createContext({} as TestContextData);

export function TesteContextProvider({ children }) {
  return (
      <TestContext.Provider value="">
        { children }
      </TestContext.Provider>
   );
} 