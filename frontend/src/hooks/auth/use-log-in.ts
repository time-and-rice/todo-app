import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "~/infra/fir";
import { LogInForm } from "~/pages/auth.log-in";

import { useAppToast } from "../misc/use-app-toast";
import { useTryState } from "../misc/use-try-state";

export function useLogIn() {
  const toast = useAppToast();

  const { loading, setLoading, error, setError } = useTryState();

  async function logIn(v: LogInForm) {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, v.email, v.password);
      toast.success("Logged in.");
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return {
    logIn,
    loading,
    error,
  };
}
