import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  // return <AuthProvider>
  //   {children}
  // </AuthProvider>
  // 这样写其实相当于：<AuthProvider children={children}/>
  // 但是我们在定义时并没有指定传入的参数 所以会报错
  return <AuthProvider>{children}</AuthProvider>;
};
