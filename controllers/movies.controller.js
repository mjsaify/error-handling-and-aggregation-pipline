import MoviesModel from "../models/movie.model.js"


export const GetAllMovies = async (req, res) => {
    try {
        
        // Find and Filter Data

        // const movies = await MoviesModel.find({ duration: +req.query.duration, ratings: +req.query.ratings}); // by adding plus string will convert into number
        // or
        // const movies = await MoviesModel.find(req.query); // internally mongodb will convert the string to number

        // mongoose special methods to filter
        // const movies = await MoviesModel.find()
        //         .where('duration')
        //         .equals(req.query.duration)
        //         .where('ratings')
        //         .equals(req.query.ratings)


        // For Mongoose 6.0 or less
        // Excluding query object properties
        // const excludeFields = ['sort', 'page', 'limit', 'fields'];
        // const queryObj = { ...req.query };

        // excludeFields.forEach((item) => {
        //     delete queryObj[item];
        // });

        // console.log(queryObj)

        // const movies = await MoviesModel.find(queryObj);

        // Mongoose 7.0

        // MongoDB query operators
        // const movies = await MoviesModel.find(
        //     {
        //         duration: {
        //             $gte: 90,
        //         },
        //         ratings: {
        //             $gte: 4,
        //         },
        //         price: {
        //             $lte: 10
        //         }
        //     }
        // );

        // make sure to sanitize req.query to prevent NoSql attacks, do not pass query like this "price[$lte]=10" instead pass query without "$" and add the "$" dynamically in the code
        const movies = await MoviesModel.find(req.query);


        return res.status(201).json({
            status: true,
            length: movies.length,
            data: { // envelop, a wrapper around this data
                movies,
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(201).json({
            status: false,
            message: error.message,
        });
    }
};

export const GetMovie = async (req, res) => {
    try {
        const movie = await MoviesModel.findById(req.params.id);

        return res.status(201).json({
            status: true,
            data: {
                movie,
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(201).json({
            status: false,
            message: error.message,
        });
    }
};


export const CreateMovie = async (req, res) => {
    try {
        const movie = await MoviesModel.insertMany(req.body);

        return res.status(201).json({
            status: true,
            movie,
        });
    } catch (error) {
        console.log(error)
        return res.status(201).json({
            status: false,
            message: error.message,
        });
    }
};


export const UpdateMovie = async (req, res) => {
    try {
        const movie = await MoviesModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        return res.status(200).json({
            status: true,
            data: {
                movie,
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(201).json({
            status: false,
            message: error.message,
        });
    }
};

export const DeleteMovie = async (req, res) => {
    try {
        const movie = await MoviesModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            status: true,
            data: null,
        });
    } catch (error) {
        console.log(error)
        return res.status(201).json({
            status: false,
            message: error.message,
        });
    }
};