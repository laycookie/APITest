import React, { useEffect, useRef, useState } from "react";
import ServerSettingPage from "./ServerSettingPage";

interface guilds {
  features: any[];
  icon: string;
  id: string;
  name: string;
  owner: boolean;
  permissions: string;
}

export default function ServerDashBoard({
  servers,
  tokenData,
}: {
  servers: guilds[];
  tokenData: any;
}) {
  const [serverData, setServerData] = useState(null);
  const dashBoardOfAllServers = useRef<HTMLUListElement>(null);
  const [pageHidden, setPageHidden] = useState(false);

  function featchServerList(): void {
    if (dashBoardOfAllServers === null) return;
    servers.map((server: guilds) => {
      fetch(`/serverData?serverId=${server.id}`).then((res) =>
        res.json().then((data) => {
          const serverEl = document.createElement("li");
          const serverNameEl = document.createElement("h5");
          const serverButtonEl = document.createElement("button");
          if (data.ServerName === null) {
            serverNameEl.innerHTML = server.name;
            serverButtonEl.innerHTML = "Add to server";
            serverButtonEl.addEventListener("click", () => {
              window.open(
                "https://discord.com/api/oauth2/authorize?client_id=789997988789092362&permissions=8&scope=bot%20applications.commands"
              );
            });
            serverEl.appendChild(serverNameEl);
            serverEl.appendChild(serverButtonEl);
          } else {
            serverNameEl.innerHTML = server.name;
            serverButtonEl.innerHTML = "Settings";
            serverButtonEl.addEventListener("click", () => {
              fetch(
                `/serverRetrive?serverId=${server.id}&userToken=${tokenData.access_token}&token_type=${tokenData.token_type}`
              ).then((res) => {
                res.json().then((data) => {
                  const serverData: any = { LocalServerData: server, db: data };
                  setServerData(serverData);
                });
              });
            });
            serverEl.appendChild(serverNameEl);
            serverEl.appendChild(serverButtonEl);
          }
          dashBoardOfAllServers?.current?.appendChild(serverEl);
        })
      );
    });
  }

  // makes sure that pages load on user signing in.
  useEffect(() => {
    featchServerList();
    setPageHidden(false);
  }, [dashBoardOfAllServers, servers]);

  // makes sure that pages load on user saving settings.
  useEffect(() => {
    if (pageHidden) return;
    featchServerList();
    setPageHidden(true);
  }, [serverData]);

  return (
    <div>
      {serverData ? (
        <ServerSettingPage
          serverData={serverData}
          setServerData={setServerData}
          setPageHidden={setPageHidden}
        />
      ) : (
        <>
          <h1>Servers</h1>
          <ul ref={dashBoardOfAllServers}></ul>
        </>
      )}
    </div>
  );
}
