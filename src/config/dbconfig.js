import { MongoClient } from "mongodb";

export default async function dbConnect(connectString) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(connectString);
        console.log('Conectando ao cluster do banco de dados...');

        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        return mongoClient;
    } catch (erro) {
        console.error('Falha na conexão com o banco!', erro);
        process.exit();
    }
}