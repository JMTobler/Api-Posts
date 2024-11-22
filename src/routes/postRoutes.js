import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts, sendPost, uploadImage, updatePost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
    // Permite que a aplicação entenda dados no formato JSON
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rota para buscar todos os posts
    app.get('/posts', listPosts);

    // Rota para criar um post
    app.post('/posts', sendPost)

    app.post('/upload', upload.single('imagem'), uploadImage);

    app.put('/upload/:id', updatePost);
}

export default routes;
