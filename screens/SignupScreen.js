import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";
import { AuthContext } from "../context/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Failed to sign you up. Please try again later",
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) return <LoadingOverlay message={"Signing up..."} />;

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
