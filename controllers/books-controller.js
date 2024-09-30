
export const getAllBooks = async (req, res, next) => {
    try {
        const books = await req.Book.find();
        if (books.length === 0) {
            return res.status(404).json({ msg: 'No books found' });
        }
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

export const searchBooks = async (req, res, next) => {
    try {
        let query = {};
        const { name, rent_min, rent_max, category } = req.query;
        if (name) {
            query = { ...query, name: { $regex: name, $options: 'i' } };
        }
        if (rent_min && rent_max) {
            query = { ...query, rent: { $gte: rent_min, $lte: rent_max } };
        }
        if (category) {
            query = { ...query, category };
        }
        const books = await req.Book.find(query);
        if (books.length === 0) {
            return res.status(404).json({ msg: 'No books found' });
        }
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};