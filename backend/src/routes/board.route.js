const router = require("express").Router();
const { createBoard, updateBoard, deleteBoard, handleBoardVisit,
    getBoardsForUser } = require("../controllers/board.controller.js")
router.get("/",getBoardsForUser)
router.post("/create",createBoard)
router.patch("/update",handleBoardVisit,updateBoard)
router.delete("/delete",handleBoardVisit,deleteBoard)

module.exports = router;