import { createContext, useContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [active, setActive] = useState(1);
  const [user, setUser] = useState("");
  const [productData, setProductData] = useState([]);
  const [invoice, setInvoice] = useState("");

  return (
    <Context.Provider
      value={{
        active,
        setActive,
        user,
        setUser,
        productData,
        setProductData,
        invoice,
        setInvoice,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;

export function ContextState() {
  return useContext(Context);
}
