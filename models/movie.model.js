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
            select: false, // this field will be excluded from the result
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
    },
    {
        // display all the virtual properties in the json data
        toJSON: {
            virtuals: true,
        },
        // toObject will make virtual properties accesseble in the code, for example showing duraction in hours on the frontend
        toObject: {
            virtuals: true,
        }
    }
);


// Virtual Property, # you cannot use virtual property for querying data because these virtual properties are not the part of database 
MoviesSchema.virtual('durationInHours').get(function(){
    return this.duration / 60; // converthing duration into hours
})

const MoviesModel = mongoose.model("Movies", MoviesSchema);
export default MoviesModel;