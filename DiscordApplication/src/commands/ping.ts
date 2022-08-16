import { ChatInputCommandInteraction, CacheType } from "discord.js";

const name = "ping";
const description = "Sends ping in the chat.";
const permissions: string[] = [];
const execute = (interaction: ChatInputCommandInteraction<CacheType>) => {
    interaction.reply("pong!");
};

export { name, description, permissions, execute };
