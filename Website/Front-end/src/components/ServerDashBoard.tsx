import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";

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
  const dashBoardOfAllServers = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (servers.length != 0) {
      console.log(servers);
    }
  }, [servers]);

  useEffect(() => {
    if (dashBoardOfAllServers === null) return;
    servers.map((server: guilds) => {
      fetch(`/serverData?serverName=${server.name}`).then((res) =>
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
              console.log("UPDATE TO SETTINGS");
              fetch(
                `/serverRetrive?serverName=${server.name}&userToken=${tokenData.access_token}`
              ).then((res) => {
                res.json().then((data) => {
                  console.log(data);
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
  }, [dashBoardOfAllServers, servers]);

  return (
    <div>
      <h1>Servers</h1>
      <ul ref={dashBoardOfAllServers}></ul>
    </div>
  );
}
