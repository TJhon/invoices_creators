import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client();

const endpoint = import.meta.env.VITE_AW_ENDPOINT;
const project = import.meta.env.VITE_AW_project;

client.setEndpoint(endpoint).setProject(project);

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { client, databases, account, storage };
