
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await req.User.find({});
        if (users.length === 0) {
            return res.status(404).json({ msg: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};