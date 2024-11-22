import 'dotenv/config';
import { ObjectId } from 'mongodb';
import dbConnect from '../config/dbconfig.js';

// Conecta ao banco de dados usando a string de conexão fornecida
const connect = await dbConnect(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getAllPosts() {
    // Seleciona o banco de dados 'imersão'
    const db = connect.db('imersão');
    // Seleciona a coleção 'posts' dentro do banco de dados
    const collection = db.collection('posts');

    // Busca todos os documentos na coleção e retorna como um array
    return collection.find().toArray();
}

export async function createPost(newPost) {
    // Seleciona o banco de dados 'imersão'
    const db = connect.db('imersão');
    // Seleciona a coleção 'posts' dentro do banco de dados
    const collection = db.collection('posts');

    // Busca todos os documentos na coleção e retorna como um array
    return collection.insertOne(newPost);
}

export async function attPost(id, newPost) {
    const db = connect.db('imersão');
    const collection = db.collection('posts');
    const objId = ObjectId.createFromHexString(id);

    return collection.updateOne({_id: new ObjectId(objId)}, {$set: newPost});
}