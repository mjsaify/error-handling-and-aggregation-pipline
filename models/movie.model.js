import mongoose from "mongoose";

const MoviesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true,
            trim: true, // removes any whitespace before and after name
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
        },
        ratings: {
            type: Number,
        },
        totalRatings: {
            type: Number,
        },
        releaseYear: {
            type: String,
            required: [true, "ReleaseYear is required"],
        },
        releaseDate: {
            type: String,
            required: [true, "ReleaseDate is required"],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        generes: {
            type: [String], // array of string
            required: [true, "Generes is required"],
        },
        directors: {
            type: [String],
            required: [true, "Directors is required"],
        },
        coverImage: {
            type: String,
            required: [true, "CoverImage is required"],
        },
        actors: {
            type: [String],
            required: [true, "CoverImage is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"]
        }
    }
);

// const MoviesSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         description: {
//             type: String,
//             required: true
//         },
//         duration: {
//             type: Number,
//             required: true
//         },
//         ratings: {
//             type: Number,
//             default: 1.0

//         },

//     }
// );

const MoviesModel = mongoose.model("Movies", MoviesSchema);
export default MoviesModel;