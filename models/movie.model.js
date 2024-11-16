import mongoose from "mongoose";
import fs from 'fs';
import validator from "validator";


const MoviesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true,
            trim: true, // removes any whitespace before and after name
            
            // data validators
            maxLength: [100, "Movie name must not have more than 100 characters"],
            minLength: [4, "Movie name atleast have 4 characters"],
            // validate: [validator.isAlpha, "Name should only contain alphabets and spaces"], // validate for number and spaces
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
            // min: [1, "Ratings should be 1 or more than 1"],
            // max: [5, "Ratings cannot be more than 5"],
            
            // Custome validator
            validate: {
                validator: function(value){
                    return value >= 1 && value <= 5; // return true or false based on condition
                },
                message: "Ratings should be above 1 and below 5, you passed ({VALUE})"
            }
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
            // enum: {
            //     values: ["Action", "Adventure", "Sci-fi", "Thriller", "Crime", "Drama", "Comedy", "Romance", "Biography"],
            //     message: "This genre does not exist",
            // },
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
            required: [true, "Actors are required"],
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
        // toObject will make virtual properties accesseble in the code, for example showing duration in hours on the frontend
        toObject: {
            virtuals: true,
        }
    }
);


// Virtual Property, # you cannot use virtual property for querying data because these virtual properties are not the part of database 
MoviesSchema.virtual('durationInHours').get(function () {
    return this.duration / 60; // converthing duration into hours
});


// Mongoose Middleware

// 1. Document middleware

// before saving document
// save method run for .save() or .create()
// it will not run for .insertMany() or findByIdAndUpdate()
MoviesSchema.pre('save', function (next) {
    console.log(this)
    this.createdBy = "MJSaify" // this pointing to the document
    next();
});


// post will not have access to this keyword
MoviesSchema.post('save', function (doc, next) { // revcieves currently save document
    const content = `New Document with name ${doc.name}\n`
    fs.writeFileSync('../log/log.txt', content, { flag: 'a' }, (err) => {
        console.log(err.message);
    });
    next();
});




// 2. Query middleware
// query middleware allows to run functions before or after a certain query is executed
// running function before find query
// MoviesSchema.pre('find', function (next) {
//     // this, in this query middleware this keyword points the current query which is processing
//     // this.find({
//     //     releaseDate: {
//     //         $lte: Date.now(),
//     //     },
//     // });

//     console.log('running parent schema pre hook');
//     next();
// });

// this middleware will run for all the query method which starts with find
// MoviesSchema.pre(/^find/, function (next) {
//     // this.find({
//     //     releaseDate: {
//     //         $lte: Date.now(),
//     //     },
//     // });

//     console.log('running parent schema pre hook');
//     next();
// });


// 3. Aggregation middleware





const MoviesModel = mongoose.model("Movies", MoviesSchema);
export default MoviesModel;