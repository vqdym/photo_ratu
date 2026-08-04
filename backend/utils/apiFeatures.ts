import { Query } from 'mongoose';
import { ParsedQs } from 'qs';

class APIFeatures<T> {
  query: Query<T[], T>;
  queryString: ParsedQs;
  constructor(query: Query<T[], T>, queryString: ParsedQs) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = Object.assign({}, this.queryString);
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    const sort = this.getString(this.queryString.sort);

    if (sort) {
      this.query = this.query.find({
        sort: sort.split(',').join(' '),
      });
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  category() {
    const category = this.getString(this.queryString.category);

    if (category) {
      this.query = this.query.find({
        category: category.split(',').join(' '),
      });
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  private getString(value: unknown): string | undefined {
    return typeof value === 'string' ? value : undefined;
  }
}

export default APIFeatures;
