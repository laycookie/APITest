const name = "ping";
const description = "Sends ping in the chat.";
const permissions: string[] = [];
const execute = () => {
    console.log("pong!");
};

export { name, description, permissions, execute };
