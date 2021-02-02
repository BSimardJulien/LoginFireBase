import "../styles/tailwind.css";
import { AppsProps } from "next/app";
import { AuthProvider } from "../utils/hooks/useAuth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
