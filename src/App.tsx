import { ConfigProvider } from "antd";
import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "./router/Layout";

export const ContextLocation = createContext({});

function App() {
  const [preLocation, setPreLocation] = useState("/");

  return (
    <ContextLocation.Provider value={{ preLocation, setPreLocation }}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Segoe UI",
          },
        }}
      >
        <ToastContainer />
        <Layout />
      </ConfigProvider>
    </ContextLocation.Provider>
  );
}

export default App;
