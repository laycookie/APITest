import { ChatInputCommandInteraction, CacheType } from "discord.js";
import { MongoClient } from "mongodb";

// database setup
const uri = `mongodb+srv://${process.env.DBUserName}:${process.env.Password}@cluster0.uzvgv.mongodb.net/?retryWrites=true&w=majority`;
const DBClient = new MongoClient(uri);
const database = DBClient.db("DiscordServerList");

// command code
const name = "ping";
const description = "Sends ping in the chat.";
const permissions: string[] = [];
const execute = async (interaction: ChatInputCommandInteraction<CacheType>) => {
    const time = new Date();
    await interaction.deferReply();

    let pingResFromDb: string | null = null;
    await database
        .collection("LAYSCORD")
        .find()
        .forEach((json) => {
            pingResFromDb = json.commands.pingRes;
            if (pingResFromDb === null) {
                interaction.editReply(
                    "Something went wrong with the database.",
                );
            } else {
                interaction.editReply(pingResFromDb);
            }
        });

    try {
        const ms = time.getMilliseconds() - new Date().getMilliseconds();
        await interaction.editReply(`${pingResFromDb} \n${ms} ms`);
    } catch {
        await interaction.editReply("PingCommand is unavailable.");
        throw new Error("Something dum had happened in ping.ts");
    }
};

export { name, description, permissions, execute };
