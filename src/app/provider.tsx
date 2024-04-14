"use client";
import Theme from "@/Theme/Theme";
import store from "@/store/Store";
import { Provider } from "react-redux";

const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <Theme>{children}</Theme>
    </Provider>
  );
};

export default AppProvider;
