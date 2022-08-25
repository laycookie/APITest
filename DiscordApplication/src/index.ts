import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { MongoClient } from "mongodb";
import { commandsCode } from "./deploy-commands";
import newServerDeployDefault from "./newServerDeployDefault.json";

// Database setup
const uri = `mongodb+srv://${process.env.DBUserName}:${process.env.Password}@cluster0.uzvgv.mongodb.net/?retryWrites=true&w=majority`;
const DBClient = new MongoClient(uri);
const database = DBClient.db("DiscordServerList");

function ifDBExistElseCreate(guild: any) {
    database.listCollections({ name: guild.name }).next((err, collinfo) => {
        if (err) throw err;
        else if (collinfo === null) {
            database.collection(guild.name).insertOne({ serverID: guild.id });
            database.collection(guild.name).insertOne(newServerDeployDefault);
        }
    });
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log("Ready!");

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const { commandName } = interaction;

        for (const command of commandsCode) {
            if (commandName === command.name) {
                command.execute(interaction);
                break;
            }
        }
    });

    // Verifying that all servers are in the database
    const guildsArr: any[] = [];
    client.guilds.cache.forEach((guild) => {
        guildsArr.push(guild);
    });
    for (const guild of guildsArr) {
        ifDBExistElseCreate(guild);
    }
});

// On bot joining a server
client.on("guildCreate", (guild) => {
    console.log(
        `Hello, I'm LMAOBOT. Thanks for inviting me, here are a list of all my commands! :alien:`,
    );

    const newServer = guild;
    ifDBExistElseCreate(guild);
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
