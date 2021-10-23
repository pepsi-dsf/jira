import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import React, { ReactNode } from "react";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from "utils/use-async";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/search-panel";

interface AuthForm {
  username: string;
  password: string;
}
// 初始化user
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
// 用于devtool
AuthContext.displayName = "AuthContext";

// 这里
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  // 这里的(user)=>setUser(user) 两个参数一样  可以消参
  // 是函数式编程的 point free 思想
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  // 页面加载时初始化user  防止每次刷新都会回到登录页面
  useMount(() => {
    // bootstrapUser().then(setUser); 用useAsync封装
    run(bootstrapUser());
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
