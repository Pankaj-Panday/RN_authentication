import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { login } from "../util/auth";
import { AuthContext } from "../context/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Failed to log you in. Please check your credentials once or try again later",
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) return <LoadingOverlay message={"Logging in.."} />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
