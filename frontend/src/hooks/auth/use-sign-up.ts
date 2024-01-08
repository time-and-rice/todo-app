import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "~/infra/fir";
import { SignUpForm } from "~/pages/auth.sign-up";

import { useAppToast } from "../misc/use-app-toast";
import { useTryState } from "../misc/use-try-state";

export function useSignUp() {
  const toast = useAppToast();

  const { loading, setLoading, error, setError } = useTryState();

  async function signUp(v: SignUpForm) {
    try {
      setLoading(true);
      if (v.password != v.confirmation) {
        throw new Error("Password does not match.");
      }
      await createUserWithEmailAndPassword(auth, v.email, v.password);
      toast.success("Signed up");
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return {
    signUp,
    loading,
    error,
  };
}
