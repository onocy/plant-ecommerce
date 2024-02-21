import React, { createContext, useContext, useEffect, useState } from "react";

export const MessageContext = createContext(null);

export const useMessage = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const message = localStorage.getItem("message");

    if (message) {
      setMessage(message);
      localStorage.removeItem("message");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 500);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
