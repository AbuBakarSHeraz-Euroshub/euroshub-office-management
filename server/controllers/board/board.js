const Board = require('../../models/Board');
const BoardMember = require('../../models/BoardMember');

const createBoard = async (req, res) => {
    try {
        const { name, desc, background, visibility } = req.body;
        const userId = req.user.id;

        // Validate required fields
        if (!name || !visibility) {
            return res.status(400).json({ message: 'Name and visibility are required' });
        }

        // Create new board
        const newBoard = new Board({
            name,
            desc: desc || '',
            background: background || '',
            visibility,
            createdBy: userId
        });

        const savedBoard = await newBoard.save();

        // Add user as a member of the board (e.g., with 'admin' role)
        const boardMember = new BoardMember({
            board: savedBoard._id,
            user: userId,
            role: 'admin' // or 'owner', depending on your schema
        });

        await boardMember.save();

        // Respond with the created board
        return res.status(201).json({
            message: 'Board created successfully',
            board: savedBoard
        });

    } catch (err) {
        console.error('Error creating board:', err);
        return res.status(500).json({ message: 'Server error while creating board' });
    }
};

module.exports = {
    createBoard
};
