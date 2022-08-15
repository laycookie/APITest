import fs from "fs";
import { SlashCommandBuilder, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import "dotenv/config";

// check that dotenv vals are set
if (
    process.env.TOKEN === undefined ||
    process.env.clientId === undefined ||
    process.env.guildId === undefined
) {
    throw new Error("Please set the TOKEN, guildId, and prefix in .env");
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// ===REMOVING ALL COMMANDS===
// for guild-based commands
rest.put(
    Routes.applicationGuildCommands(process.env.clientId, process.env.guildId),
    { body: [] },
)
    .then(() => console.log("Successfully deleted all guild commands."))
    .catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(process.env.clientId), { body: [] })
    .then(() => console.log("Successfully deleted all application commands."))
    .catch(console.error);

// ===ADDING A NEW COMMAND===
const commands = [];

for (let i = 0; i < fs.readdirSync("./src/commands").length; i++) {
    const command: string = fs.readdirSync("./src/commands")[i];
    // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires
    const { name, description } = require(`./commands/${command}`);

    commands.push(
        new SlashCommandBuilder().setName(name).setDescription(description),
    );
}

rest.put(
    Routes.applicationGuildCommands(process.env.clientId, process.env.guildId),
    { body: commands },
)
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
