import React from 'react';

const MyContext = React.createContext();

function MyProvider({ children }) {
    const [state, setState] = React.useState({});
  
    return (
      <MyContext.Provider value={{ state, setState }}>
        {children}
      </MyContext.Provider>
    );
  }
  

  export { MyContext, MyProvider };