import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { commandsCode } from "./deploy-commands";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    await commandsCode
        .find((command) => commandName === command.name)
        ?.execute(interaction);
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
