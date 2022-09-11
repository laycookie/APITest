import React, { useEffect } from "react";

export default function ServerSettingPage({
  serverData,
  setServerData,
  setPageHidden,
  tokenData,
}: {
  serverData: any;
  setServerData: any;
  setPageHidden: any;
  tokenData: any;
}) {
  function submitForm(event: any): void {
    const postData = {
      serverName: serverData.LocalServerData.name,
      serverId: serverData.LocalServerData.id,
      uesrToken: tokenData.access_token,
      tokenType: tokenData.token_type,
      commands: {
        pingRes: event.target.elements.pingRes.value,
      },
    };
    console.log(postData);
    fetch("/submitServerSettings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    setServerData(null);
    setPageHidden(false);
  }
  return (
    <>
      <h1>Server Setting: {serverData.LocalServerData.name}</h1>
      <form onSubmitCapture={submitForm}>
        <p>Ping command respond</p>
        <input
          type="text"
          defaultValue={serverData.db.data.pingRes}
          placeholder="Ping command respond"
          name="pingRes"
          id="pingRes"
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
