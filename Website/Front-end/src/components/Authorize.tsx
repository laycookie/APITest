import React, { useEffect, useState } from "react";

import ServerDashBoard from "./ServerDashBoard";

interface basicProfileData {
  accent_color: string;
  avatar: string;
  avatar_decoration: string;
  banner: string;
  banner_color: string;
  discriminator: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  public_flags: number;
  username: string;
}

interface guilds {
  features: any[];
  icon: string;
  id: string;
  name: string;
  owner: boolean;
  permissions: string;
}

export default function authorize({ tokenData }: any) {
  const [basicProfileData, setBasicProfileData] =
    useState<basicProfileData | null>(null);
  const [guilds, setGuilds] = useState<guilds[] | null>(null);
  const [adminGuilds, setAdminGuilds] = useState<guilds[]>([]);

  const permisionsObject = {
    CREATE_INSTANT_INVITE: 1,
    KICK_MEMBERS: 2,
    BAN_MEMBERS: 4,
    ADMINISTRATOR: 8,
    MANAGE_CHANNELS: 16,
    MANAGE_GUILD: 32,
    ADD_REACTIONS: 64,
    VIEW_AUDIT_LOG: 128,
    PRIORITY_SPEAKER: 256,
    STREAM: 512,
    VIEW_CHANNEL: 1024,
    SEND_MESSAGES: 2048,
    SEND_TTS_MESSAGES: 4096,
    MANAGE_MESSAGES: 8192,
    EMBED_LINKS: 16384,
    ATTACH_FILES: 32768,
    READ_MESSAGE_HISTORY: 65536,
    MENTION_EVERYONE: 131072,
    USE_EXTERNAL_EMOJIS: 262144,
    VIEW_GUILD_INSIGHTS: 524288,
    CONNECT: 1048576,
    SPEAK: 2097152,
    MUTE_MEMBERS: 4194304,
    DEAFEN_MEMBERS: 8388608,
    MOVE_MEMBERS: 16777216,
    USE_VAD: 33554432,
    CHANGE_NICKNAME: 67108864,
    MANAGE_NICKNAMES: 134217728,
    MANAGE_ROLES: 268435456,
    MANAGE_WEBHOOKS: 536870912,
    MANAGE_EMOJIS_AND_STICKERS: 1073741824,
    USE_APPLICATION_COMMAND: 2147483648,
    REQUEST_TO_SPEAK: 4294967296,
    MANAGE_EVENTS: 8589934592,
    MANAGE_THREADS: 17179869184,
    CREATE_PUBLIC_THREADS: 34359738368,
    CREATE_PRIVATE_THREADS: 68719476736,
    USE_EXTERNAL_STICKERS: 137438953472,
    SEND_MESSAGES_IN_THREADS: 274877906944,
    USE_EMBEDDED_ACTIVITIES: 549755813888,
    MODERATE_MEMBERS: 1099511627776,
  };

  function intPermsToStringArr(guildPerms: string) {
    let guildPermsNum = Number(guildPerms);
    const perms: string[] = [];

    //this function is here puerly so you could hide this mess
    function runTroughtHell() {
      if (guildPermsNum >= permisionsObject.MODERATE_MEMBERS) {
        guildPermsNum -= permisionsObject.MODERATE_MEMBERS;
        perms.push("MODERATE_MEMBERS");
      }
      if (guildPermsNum >= permisionsObject.USE_EMBEDDED_ACTIVITIES) {
        guildPermsNum -= permisionsObject.USE_EMBEDDED_ACTIVITIES;
        perms.push("USE_EMBEDDED_ACTIVITIES");
      }
      if (guildPermsNum >= permisionsObject.SEND_MESSAGES_IN_THREADS) {
        guildPermsNum -= permisionsObject.SEND_MESSAGES_IN_THREADS;
        perms.push("SEND_MESSAGES_IN_THREADS");
      }
      if (guildPermsNum >= permisionsObject.USE_EXTERNAL_STICKERS) {
        guildPermsNum -= permisionsObject.USE_EXTERNAL_STICKERS;
        perms.push("USE_EXTERNAL_STICKERS");
      }
      if (guildPermsNum >= permisionsObject.CREATE_PRIVATE_THREADS) {
        guildPermsNum -= permisionsObject.CREATE_PRIVATE_THREADS;
        perms.push("CREATE_PRIVATE_THREADS");
      }
      if (guildPermsNum >= permisionsObject.CREATE_PUBLIC_THREADS) {
        guildPermsNum -= permisionsObject.CREATE_PUBLIC_THREADS;
        perms.push("CREATE_PUBLIC_THREADS");
      }
      if (guildPermsNum >= permisionsObject.MANAGE_THREADS) {
        guildPermsNum -= permisionsObject.MANAGE_THREADS;
        perms.push("MANAGE_THREADS");
      }
      if (guildPermsNum >= permisionsObject.MANAGE_EVENTS) {
        guildPermsNum -= permisionsObject.MANAGE_EVENTS;
        perms.push("MANAGE_EVENTS");
      }
      if (guildPermsNum >= permisionsObject.REQUEST_TO_SPEAK) {
        guildPermsNum -= permisionsObject.REQUEST_TO_SPEAK;
        perms.push("REQUEST_TO_SPEAK");
      }
      if (guildPermsNum >= permisionsObject.USE_APPLICATION_COMMAND) {
        guildPermsNum -= permisionsObject.USE_APPLICATION_COMMAND;
        perms.push("USE_APPLICATION_COMMAND");
      }
      if (guildPermsNum >= permisionsObject.MANAGE_EMOJIS_AND_STICKERS) {
        guildPermsNum -= permisionsObject.MANAGE_EMOJIS_AND_STICKERS;
        perms.push("MANAGE_EMOJIS_AND_STICKERS");
      }
      if (guildPermsNum >= permisionsObject.MANAGE_WEBHOOKS) {
        guildPermsNum -= permisionsObject.MANAGE_WEBHOOKS;
        perms.push("MANAGE_WEBHOOKS");
      }
      if (guildPermsNum >= permisionsObject.MANAGE_ROLES) {
        guildPermsNum -= permisionsObject.MANAGE_ROLES;
        perms.push("MANAGE_ROLES");
      }
      if (guildPermsNum >= permisionsObject.MANAGE_NICKNAMES) {
        guildPermsNum -= permisionsObject.MANAGE_NICKNAMES;
        perms.push("MANAGE_NICKNAMES");
      }
      if (guildPermsNum >= permisionsObject.CHANGE_NICKNAME) {
        guildPermsNum -= permisionsObject.CHANGE_NICKNAME;
        perms.push("CHANGE_NICKNAME");
      }
      if (guildPermsNum >= permisionsObject.USE_VAD) {
        guildPermsNum -= permisionsObject.USE_VAD;
        perms.push("USE_VAD");
      }
      if (guildPermsNum >= permisionsObject.MOVE_MEMBERS) {
        guildPermsNum -= permisionsObject.MOVE_MEMBERS;
        perms.push("MOVE_MEMBERS");
      }
      if (guildPermsNum >= permisionsObject.DEAFEN_MEMBERS) {
        guildPermsNum -= permisionsObject.DEAFEN_MEMBERS;
        perms.push("DEAFEN_MEMBERS");
      }
      if (guildPermsNum >= permisionsObject.MUTE_MEMBERS) {
        guildPermsNum -= permisionsObject.MUTE_MEMBERS;
        perms.push("MUTE_MEMBERS");
      }
      if (guildPermsNum >= permisionsObject.SPEAK) {
        guildPermsNum -= permisionsObject.SPEAK;
        perms.push("SPEAK");
      }
      if (guildPermsNum >= permisionsObject.CONNECT) {
        guildPermsNum -= permisionsObject.CONNECT;
        perms.push("CONNECT");
      }
      if (guildPermsNum >= permisionsObject.VIEW_GUILD_INSIGHTS) {
        guildPermsNum -= permisionsObject.VIEW_GUILD_INSIGHTS;
        perms.push("VIEW_GUILD_INSIGHTS");
      }
      if (guildPermsNum >= permisionsObject.USE_EXTERNAL_EMOJIS) {
        guildPermsNum -= permisionsObject.USE_EXTERNAL_EMOJIS;
        perms.push("USE_EXTERNAL_EMOJIS");
      }
      if (guildPermsNum >= permisionsObject.MENTION_EVERYONE) {
        guildPermsNum -= permisionsObject.MENTION_EVERYONE;
        perms.push("MENTION_EVERYONE");
      }
      if (guildPermsNum >= permisionsObject.READ_MESSAGE_HISTORY) {
        guildPermsNum -= permisionsObject.READ_MESSAGE_HISTORY;
        perms.push("READ_MESSAGE_HISTORY");
      }
      if (guildPermsNum >= permisionsObject.ATTACH_FILES) {
        guildPermsNum -= permisionsObject.ATTACH_FILES;
        perms.push("ATTACH_FILES");
      }
      if (guildPermsNum >= permisionsObject.EMBED_LINKS) {
        guildPermsNum -= permisionsObject.EMBED_LINKS;
        perms.push("EMBED_LINKS");
      }
      if (guildPermsNum >= permisionsObject.MANAGE_MESSAGES) {
        guildPermsNum -= permisionsObject.MANAGE_MESSAGES;
        perms.push("MANAGE_MESSAGES");
      }
      if (guildPermsNum >= permisionsObject.SEND_TTS_MESSAGES) {
        guildPermsNum -= permisionsObject.SEND_TTS_MESSAGES;
        perms.push("SEND_TTS_MESSAGES");
      }
      if (guildPermsNum >= permisionsObject.SEND_MESSAGES) {
        guildPermsNum -= permisionsObject.SEND_MESSAGES;
        perms.push("SEND_MESSAGES");
      }
      if (guildPermsNum >= permisionsObject.VIEW_CHANNEL) {
        guildPermsNum -= permisionsObject.VIEW_CHANNEL;
        perms.push("VIEW_CHANNEL");
      }
      if (guildPermsNum >= permisionsObject.STREAM) {
        guildPermsNum -= permisionsObject.STREAM;
        perms.push("STREAM");
      }
      if (guildPermsNum >= permisionsObject.PRIORITY_SPEAKER) {
        guildPermsNum -= permisionsObject.PRIORITY_SPEAKER;
        perms.push("PRIORITY_SPEAKER");
      }
      if (guildPermsNum >= permisionsObject.VIEW_AUDIT_LOG) {
        guildPermsNum -= permisionsObject.VIEW_AUDIT_LOG;
        perms.push("VIEW_AUDIT_LOG");
      }
      if (guildPermsNum >= permisionsObject.ADD_REACTIONS) {
        guildPermsNum -= permisionsObject.ADD_REACTIONS;
        perms.push("ADD_REACTIONS");
      }
      if (guildPermsNum >= permisionsObject.MANAGE_GUILD) {
        guildPermsNum -= permisionsObject.MANAGE_GUILD;
        perms.push("MANAGE_GUILD");
      }
      if (guildPermsNum >= permisionsObject.MANAGE_CHANNELS) {
        guildPermsNum -= permisionsObject.MANAGE_CHANNELS;
        perms.push("MANAGE_CHANNELS");
      }
      if (guildPermsNum >= permisionsObject.ADMINISTRATOR) {
        guildPermsNum -= permisionsObject.ADMINISTRATOR;
        perms.push("ADMINISTRATOR");
      }
      if (guildPermsNum >= permisionsObject.BAN_MEMBERS) {
        guildPermsNum -= permisionsObject.BAN_MEMBERS;
        perms.push("BAN_MEMBERS");
      }
      if (guildPermsNum >= permisionsObject.KICK_MEMBERS) {
        guildPermsNum -= permisionsObject.KICK_MEMBERS;
        perms.push("KICK_MEMBERS");
      }
      if (guildPermsNum >= permisionsObject.CREATE_INSTANT_INVITE) {
        guildPermsNum -= permisionsObject.CREATE_INSTANT_INVITE;
        perms.push("CREATE_INSTANT_INVITE");
      }
    }
    runTroughtHell();
    return perms;
  }

  useEffect(() => {
    fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        authorization: `${tokenData.token_type} ${tokenData.access_token}`,
      },
    }).then((res) => {
      res
        .json()
        .then((data) => {
          setBasicProfileData(data);
        })
        .catch((error) => console.error("something went wrong", error));
    });

    fetch("https://discord.com/api/v10/users/@me/guilds", {
      headers: {
        authorization: `${tokenData.token_type} ${tokenData.access_token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        setGuilds(data);
      });
    });
  }, []);

  useEffect(() => {
    if (!guilds) return;
    for (const guild of guilds) {
      for (const perm of intPermsToStringArr(guild.permissions)) {
        if (perm === "ADMINISTRATOR") {
          setAdminGuilds((cur) => [...cur, guild]);
        }
      }
    }
  }, [guilds]);

  return (
    <>
      {basicProfileData ? (
        <>
          <img
            src={
              "https://cdn.discordapp.com/avatars/" +
              basicProfileData?.id +
              "/" +
              basicProfileData?.avatar
            }
            alt="avatar"
          />
          <p>{basicProfileData?.username}</p>

          <ServerDashBoard servers={adminGuilds} tokenData={tokenData} />
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
