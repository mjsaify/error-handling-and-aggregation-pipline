import { Router } from "express";
import { CreateMovie, DeleteMovie, GetAllMovies, GetMovie, UpdateMovie } from "../controllers/movies.controller.js";

const router = Router();

router.route('/movies')
    .get(GetAllMovies)
    .post(CreateMovie)

router.route('/movies/:id')
    .get(GetMovie)
    .put(UpdateMovie)
    .delete(DeleteMovie)

export default router;