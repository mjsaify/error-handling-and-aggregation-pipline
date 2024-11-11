import { Router } from "express";
import { CreateMovie, DeleteMovie, GetAllMovies, GetHighestRatedMoveis, GetMovie, UpdateMovie } from "../controllers/movies.controller.js";

const router = Router();

router.route('/highest-rated-movies')
    .get(GetHighestRatedMoveis, GetAllMovies)


router.route('/movies')
    .get(GetAllMovies)
    .post(CreateMovie)

router.route('/movies/:id')
    .get(GetMovie)
    .put(UpdateMovie)
    .delete(DeleteMovie)

export default router;