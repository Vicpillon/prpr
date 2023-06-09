const { boardService } = require("../service");


const boardController = {

    async createBoard(req, res, next) {
        try {
            const { author, title, content, image } = req.body;
            const newBoard = await boardService.createBoard({ author, title, content, image });
            res.status(201).json(newBoard);
        } catch (error) {
            next(error)
        }
    },

    async getBoards(req, res, next) {
        try {
            //page:현재페이지, perPage:페이지 당 게시글 수
            const page = Number(req.query.page || 1);
            const perPage = Number(req.query.perPage || 5);
            const { boards, total, totalPage } = await boardService.getBoardAll(page, perPage);
            res.json({ boards, page, perPage, total, totalPage });

        } catch (error) {
            next(error);
        }
    },

    async getBoard(req, res, next) {
        try {
            const { id } = req.params;
            const board = await boardService.getBoard(id);
            res.json(board);
        } catch (error) {
            next(error);
        }
    },

    async editBoard(req, res, next) {
        try {
            const { id } = req.params;
            const { title, content, image } = req.body;
            const updatedBoard = await boardService.updateBoard(id, { title, content, image });
            res.json(updatedBoard);
        } catch (error) {
            next(error);
        }
    },

    async deleteBoard(req, res, next) {
        try {
            const { id } = req.params;
            const board = await boardService.deleteBoard(id);
            res.json(board);

        } catch (error) {
            next(error);
        }
    },

    async createComment(req, res, next) {
        try {
            const { id } = req.params;
            const { writer, content } = req.body;
            const board = await boardService.createComment(id, { writer, content })
            res.json(board);


        } catch (error) {
            next(error);
        }
    },

    async deleteComment(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }

};

module.exports = boardController;
