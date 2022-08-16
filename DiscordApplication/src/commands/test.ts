import { ChatInputCommandInteraction, CacheType } from "discord.js";

const name = "test";
const description = "Sends test in the chat.";
const permissions: string[] = [];
const execute = async (interaction: ChatInputCommandInteraction<CacheType>) => {
    interaction.reply("test!");
};

export { name, description, permissions, execute };
