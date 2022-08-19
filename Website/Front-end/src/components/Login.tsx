import { useEffect } from "react";

export default function Login() {
  function login() {
    const OAuthWin = window.open(
      "https://discord.com/api/oauth2/authorize?client_id=1009316767375577159&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2FdiscordOAuth&response_type=code&scope=identify%20guilds%20guilds.members.read",
      "popup",
      "width=500,height=850"
    );

    if (!OAuthWin) return;

    function listener(message: any) {
      if (!message.data.isOAuthInfo) return;
      console.log(message.data.oAuthInfo);
    }

    window.addEventListener("message", listener);

    let timer = setInterval(function () {
      if (OAuthWin.closed) {
        clearInterval(timer);
        window.removeEventListener("message", listener);
      }
    }, 1000);
  }

  return (
    <>
      <h1>Please log in.</h1>
      <button onClick={login}>Discord Login</button>
    </>
  );
}
