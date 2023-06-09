const express = require("express")
const { boardController } = require("../controller")


/**  
 * @swagger
 * tags:
 *   name: Board
 *   description: 커뮤니티 게시판 관리
 */
const boardRouter = express.Router();

/**
 * @swagger
 * /api/v1/board:
 *  post:
 *    summary: "게시글 등록"
 *    description: "POST 방식으로 게시글를 등록한다."
 *    tags: [Board]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              author:
 *                type: string
 *                description: "작성자"
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              content:
 *                type: string
 *                description: "게시들 내용"
 *              image:
 *                type: string
 *                description: "게시들 이미지"
 */
boardRouter.post("/", boardController.createBoard);

/**
 * @swagger
 * /api/v1/board:
 *  get: 
 *    summary: "게시글조회"
 *    description: "모든 게시글 조회"
 *    tags: [Board]
 *    parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        description: 현재페이지
 *        schema:
 *          type: string
 *      - in: query
 *        name: perPage
 *        required: false
 *        description: 게시글 수
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 게시글 조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": []}]
 */
boardRouter.get("/", boardController.getBoards);

/**
 * @swagger
 * /api/v1/board/{id}:
 *  get: 
 *    summary: "게시글 상세조회"
 *    description: "게시글 상세조회"
 *    tags: [Board]
 *    parameters:
 *      - in: path
 *        name: board_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 게시글 상세조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": []}]
 */
boardRouter.get("/:id", boardController.getBoard);


boardRouter.put("/:id", boardController.editBoard)


boardRouter.delete("/:id", boardController.deleteBoard)



// 댓글
boardRouter.post("/:id/comment", boardController.createComment);


module.exports = boardRouter;