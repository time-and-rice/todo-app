async function main() {
  const apiKey = "AIzaSyAL2O4wRTYSXGgMeXu2zaHuIV2Iu2Ml5OA";
  const res = await fetch(
    `http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "user-1@example.com",
        password: "password",
        returnSecureToken: true,
      }),
    }
  );
  const json = await res.json();
  console.log(json);
}

main().catch(console.error);
