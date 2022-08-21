// command code
const name = "ping";
const description = "Sends ping in the chat.";
const permissions: string[] = [];
const execute = async (interaction: ChatInputCommandInteraction<CacheType>) => {
    const time = new Date();
    await interaction.deferReply();
    await interaction.editReply("Pong !");

    try {
        const ms = time.getMilliseconds() - new Date().getMilliseconds();
        await interaction.editReply(`Pong !\n${ms} ms`);
    } catch {
        await interaction.editReply("PingCommand is unavailable.");
        throw new Error("Something dum had happened in ping.ts");
    }
};

export { name, description, permissions, execute };
