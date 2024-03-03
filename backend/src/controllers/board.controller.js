const Board = require("../models/board.model.js")
const User = require("../models/user.model.js")
async function handleBoardVisit(req, res) {
    const { boardId, userId } = req.body; // Assuming boardId and userId are extracted from request
  
    try {
      const user = await User.findByIdAndUpdate(userId, {
        $push: {
          recentlyVisitedBoards: {
            boardId,
            visitedAt: Date.now() // Update timestamp
          }
        }
      });
  
      // Send response or redirect as needed
    } catch (error) {
      // Handle errors
      res.status(500).send(error)
    }
}
  
async function createBoard(req, res) {
  try {
    const { name, userId } = req.body; // Assuming board name comes from the request body Assuming user ID is available from the request

    // Validate input (optional)
    if (!name) {
      return res.status(400).send({ message: "Board name is required" });
    }

    // Create a new board document
    const newBoard = new Board({
      name,
      createdBy: userId, // Reference the current user as creator
      members: [userId], //
    });

    // Save the board to the database
    const savedBoard = await newBoard.save();

    // Update the user's recently visited boards (optional)
    await User.findByIdAndUpdate(userId, {
      $push: {
        recentlyVisitedBoards: {
          boardId: savedBoard._id,
          visitedAt: Date.now(),
        }
      }
    });

    res.status(201).send(savedBoard); // Send the created board data
  } catch (error) {
    res.status(500).send({ error: error.message }); // Send a descriptive error response
  }
}

async function deleteBoard(req, res) {
  try {
    const { boardId } = req.body; // Assuming board ID comes from request parameters
    const{ userId} = req.body; // Assuming user ID is available from the request

    // Check if the user is a member of the board
    const board = await Board.findById(boardId).populate('members');
    if (!board.members.some(member => member._id.equals(userId))) {
      return res.status(403).send({ message: "Unauthorized: You are not a member of this board" });
    }

    // Delete the board
    await Board.findByIdAndDelete(boardId);

    res.status(200).send({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}


async function updateBoard(req, res) {
  try {
    const { boardId } = req.body; // Assuming board ID comes from request parameters
    const {userId} = req.body; // Assuming user ID is available from the request
    const { name } = req.body; // Assuming board name comes from request body

    // Check if the user is a member of the board
    const board = await Board.findById(boardId).populate('members');
    if (!board.members.some(member => member._id.equals(userId))) {
      return res.status(403).send({ message: "Unauthorized: You are not a member of this board" });
    }

    // Update the board
    const updatedBoard = await Board.findByIdAndUpdate(boardId, { name }, { new: true }); // Return updated document

    res.status(200).send(updatedBoard);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function getBoardsForUser(req, res) {
  try {
    const { userId } = req.body; // Assuming user ID is available from the request

    // Find boards where user is a member (using $in operator)
    const boards = await Board.find({ 
      members: { $in: [userId] } 
    }).populate('members');

    if (!boards.length) {
      return res.status(200).send({ message: "No boards found for this user" });
    }

    res.status(200).send(boards);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to retrieve boards" });
  }
}

module.exports = {createBoard:createBoard, updateBoard:updateBoard, deleteBoard:deleteBoard, handleBoardVisit:handleBoardVisit, getBoardsForUser:getBoardsForUser}
  