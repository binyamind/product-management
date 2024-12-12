import { Header } from "../components/Header";
import "../styles/layout.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <Header />
      <div className="innerWarp"> {children}</div>
    </div>
  );
};
