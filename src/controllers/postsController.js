import { getAllPosts, createPost, attPost } from "../models/postModel.js";
import gerarDescricaoComGemini from '../services/geminiService.js';
import fs from "fs";

export async function listPosts(req, res) {
    // Busca todos os posts
    const posts = await getAllPosts();

    // Envia os posts como uma resposta JSON com status 200 (sucesso)
    res.status(200).json(posts);
}

export async function sendPost(req, res) {
    const newPost = req.body;

    try {
        const postCreated = await createPost(newPost);
        res.status(200).json(postCreated);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição!"});
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCreated = await createPost(newPost);
        const updatedImg = `uploads/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImg);

        res.status(200).json(postCreated);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição!"});
    }
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImage,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCreated = await attPost(id, post);

        res.status(200).json(postCreated);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição!"});
    }
}