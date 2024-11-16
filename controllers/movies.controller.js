import MoviesModel from "../models/movie.model.js"
import ApiFeatures from "../utils/ApiFeatures.js";
import { asyncErrorHandler } from "../utils/AsyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";




// Not Working: To resolve watch #76, #77, #80 videos procademy node js 
export const GetHighestRatedMoveis = (req, _, next) => {
    // req.query.limit = '5';
    // req.query.sort = '-ratings';
    // next()
}

export const GetAllMovies = asyncErrorHandler(async (req, res, next) => {
    // Reusable Class
    const feature = new ApiFeatures(MoviesModel.find(), req.query).sort().limitFields().paginate(); // returns instance of api features
    const movies = await feature.query;

    return res.status(201).json({
        status: true,
        length: movies.length,
        data: { // envelop, a wrapper around this data
            movies,
        }
    });
});

export const GetMovie = asyncErrorHandler(async (req, res, next) => {
    const movie = await MoviesModel.findById(req.params.id);

    // Not found error
    if (!movie) {
        const error = new CustomError(404, "Movie with that id is not found");
        return next(error);
    };

    return res.status(200).json({
        status: true,
        data: {
            movie,
        }
    });
});


export const CreateMovie = asyncErrorHandler(async (req, res, next) => {
    const movie = await MoviesModel.insertMany(req.body);

    return res.status(201).json({
        status: true,
        movie,
    });
});


export const UpdateMovie = asyncErrorHandler(async (req, res, next) => {
    const movie = await MoviesModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    return res.status(200).json({
        status: true,
        data: {
            movie,
        }
    });
});

export const DeleteMovie = asyncErrorHandler(async (req, res, next) => {
    const movie = await MoviesModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
        status: true,
        data: null,
    });
});


// MongoDB Aggregation Pipeline
export const GetMovieStats = asyncErrorHandler(async (req, res, next) => {
    // aggregate is a mongodb feature which allows us to aggregate data for example: calculating averages, getting min and max value, or getting the sum etc.
    const stats = await MoviesModel.aggregate([
        {
            $match: {
                ratings: {
                    $gte: 4.5, // filter those data where rating is greater than and equal to 4.5
                }
            },
        },
        {

            $group: { // groups document using accumulator
                // _id: null, // this will specify what we want to group by
                _id: '$releaseYear', // grouping documents based on releaseYear
                avgRating: { $avg: '$ratings' }, // calculates average ratings of all the movies, specify the field with '$fieldName'
                avgPrice: { $avg: '$price' }, // calculates average price of all the movies
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
                totalPrice: { $sum: '$price' },
                movieCount: { $sum: 1 }, // for each document it will add 1, initlally movieCount will be 0
            },
        },
        // {
        //     $sort: {
        //         minPrice: 1, // sorting results based on minPrice, 1 for ascending order
        //     }
        // },
        // {
        //     $match: {
        //         maxPrice: {
        //             $gte: 15,
        //         }
        //     }
        // }
    ]);

    return res.status(200).json({
        status: true,
        length: stats.length,
        data: {
            stats
        },
    });
});


export const GetMovieGenere = asyncErrorHandler(async (req, res, next) => {
    const generes = req.params.genre;
    const movies = await MoviesModel.aggregate([
        {
            // deconstructs an array field in a document and create separate output documents for each item in the array
            $unwind: '$generes'
        },
        {
            $group: {
                _id: '$generes',
                movieCount: { $sum: 1 },
                movies: {
                    $push: {
                        name: '$name',
                        // description: '$description',
                        // coverImage: '$coverImage',
                    }
                }
            }
        },
        {
            $addFields: {
                generes: '$_id'
            }
        },
        {
            // projects tell which fields do we want or don't want in the result
            $project: {
                _id: 0, // id field will not be in the response
            }
        },
        {
            $sort: {
                movieCount: -1,
            }
        },
        // {
        //     $limit: 8,
        // }

        // {
        //     // this not working, this would show only the matched generes document
        //     $match: {
        //         generes
        //     },
        // }
    ])


    return res.status(200).json({
        status: true,
        length: movies.length,
        data: {
            movies
        },
    });
});