import mongoose from "mongoose";
import fs from 'fs';

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