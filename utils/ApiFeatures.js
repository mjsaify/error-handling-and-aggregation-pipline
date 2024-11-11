class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    };

    // filter method will not work if with other queries such as sort or fields or page, try to find another way
    filter() {
        let queryStr = JSON.stringify(this.queryString);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        const queryObj = JSON.parse(queryStr);
        console.log(queryObj)
        this.query = this.query.find({ page: '2', limit: '3', sort: 'price' });
        return this;
    };

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy); // sort data
        };
        return this;
    };

    limitFields() {
        if (this.queryString.fields) {
            const selectedFields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(selectedFields);

        } else {
            // excluding field
            this.query = this.query.select("-__v");
        }

        return this;
    };

    paginate() {
        const page = this.queryString.page * 1 || 1; // first page
        const limit = this.queryString.limit * 1 || 10; // 10 items

        // Page 1: 1 - 10; Page 2: 11 - 20; Page 3: 21 - 30;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        // commenting this code due to await error
        // if (this.queryString.page) {
        //     // handling page exceeding error
        //     const totalMovies = await MoviesModel.countDocuments();
        //     if (skip >= totalMovies) {
        //         throw new Error("404 Page Not Found")
        //     }
        // }

        return this;
    }
};

export default ApiFeatures;