async function getHomePageData(req, res) {
    const userId = req.user.id;
  
    try {
      const user = await User.findById(userId).populate('recentlyVisitedBoards');
      const sortedBoards = user.recentlyVisitedBoards.sort((a, b) => b.visitedAt - a.visitedAt);
  
      if (sortedBoards.length > 3) {
        sortedBoards = sortedBoards.slice(0, 3);
      }
  
      if (sortedBoards.length === 0) {
        return res.status(404).send({ message: "No boards found, please create or join one" });
      }
  
      return res.status(401).send(sortedBoards);
    } catch (error) {
      res.status(500).send({ error: error.message }); // Send a more descriptive error response
    }
  }
  
module.exports = getHomePageData;