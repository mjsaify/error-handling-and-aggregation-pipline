import { Router } from "express";
import { CreateMovie, DeleteMovie, GetAllMovies, GetHighestRatedMoveis, GetMovie, GetMovieGenere, GetMovieStats, UpdateMovie } from "../controllers/movies.controller.js";

const router = Router();

router.route('/highest-rated-movies')
    .get(GetHighestRatedMoveis, GetAllMovies)


router.route('/movie-stats')
    .get(GetMovieStats)

router.route('/movie-by-genre/:generes')
    .get(GetMovieGenere)

router.route('/movies')
    .get(GetAllMovies)
    .post(CreateMovie)

router.route('/movies/:id')
    .get(GetMovie)
    .put(UpdateMovie)
    .delete(DeleteMovie)

export default router;