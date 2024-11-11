import MoviesModel from "../models/movie.model.js"
import ApiFeatures from "../utils/ApiFeatures.js";


// Not Working: To resolve watch #76, #77, #80 videos procademy node js 
export const GetHighestRatedMoveis = (req, _, next) =>{
    // req.query.limit = '5';
    // req.query.sort = '-ratings';
    // next()
}

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

        // make sure to sanitize req.query to prevent NoSql attacks, do not pass query like this "price[$lte]=10" instead pass query without "$" and then add the "$" symbol dynamically in the code
        // const movies = await MoviesModel.find(req.query);

        // let queryString = JSON.stringify(req.query);
        // queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        // const queryObj = JSON.parse(queryString);
        // console.log(queryObj)


        // Sorting
        // let query = MoviesModel.find(); // find data

        // check if query object has the sort property
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     query = query.sort(sortBy); // sort data
        // }


        // Limiting/Projection Fields
        // if (req.query.fields) {
        //     const selectedFields = req.query.fields.split(',').join(' ');
        //     query = query.select(selectedFields);
        // } else {
        //     // excluding field
        //     query = query.select("-__v");
        // }


        // Pagination
        // query
        // .skip("how many result to skip") // skips the number of documents specified in the function
        // .limit("how many records you want in result") // limit() function in MongoDB is used to specify the maximum number of results to be returned

        // const page = req.query.page * 1 || 1; // first page
        // const limit = req.query.limit * 1 || 10; // 10 items

        // // Page 1: 1 - 10; Page 2: 11 - 20; Page 3: 21 - 30;
        // const skip = (page - 1) * limit;
        // query = query.skip(skip).limit(limit);

        // if(req.query.page){
        //     // handling page exceeding error
        //     const totalMovies = await MoviesModel.countDocuments();
        //     if(skip >= totalMovies){
        //         throw new Error("404 Page Not Found")
        //     }
        // }

        // const movies = await query;

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


