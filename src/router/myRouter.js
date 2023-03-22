const express = require("express");
const { userController, recruitmentController } = require("../controller");
const { userMiddleware, authMiddleware } = require("../middleware");

const myRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관리
 */

/**
 * @swagger
 * /api/v1/my/{id}:
 *  put:
 *    summary: "사용자 정보 수정"
 *    description: "로그인한 사용자 개인정보 수정."
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: 수정하려는 사용자 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 수정하고자 하는 사용자 정보(userId, 이메일, userType 제외)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "사용자 이름"
 *              password:
 *                type: string
 *                description: "비밀번호"
 *              address:
 *                type: string
 *                description: "주소"
 *              phoneNumber:
 *                type: string
 *                description: "휴대폰 번호"
 *              nickname:
 *                type: string
 *                description: "작성자"
 *              profileImage:
 *                type: string
 *                description: "프로필 이미지 url"
 *    responses:
 *      "200":
 *        description: 수정된 사용자 정보
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                data:
 *                  type: object
 *                  example: [{"error": null,
 * "data": {"_id": "userId", "name": "사용자 이름", "email": "email123@gmail.com", "address": "사용자 주소", "phoneNumber": "010-1234-5678", "nickname": "사용자 닉네임", "profileImage": "프로필 이미지 url", "userType": "user", "createdAt": "2023-03-20T16:27:35.255Z", "updatedAt": "2023-03-21T07:19:32.821Z", "__v": 0}}]
 */

// 사용자 정보 수정
myRouter.put(
  "/:id",
  authMiddleware.verifyAuthorizedUser("params"),
  userMiddleware.checkUserIdFrom("params"),
  userMiddleware.checkUserInfoFrom("body"),
  userController.updateUser
);

/**
 * @swagger
 * /api/v1/my/{id}:
 *  get:
 *    summary: "사용자 정보 조회"
 *    description: "로그인한 사용자 개인정보 조회."
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: 조회하려는 사용자 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자 정보
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                data:
 *                  type: object
 *                  example: [{"error": null,
 * "data": {"_id": "userId", "name": "사용자 이름", "email": "email123@gmail.com", "address": "사용자 주소", "phoneNumber": "010-1234-5678", "nickname": "사용자 닉네임", "profileImage": "프로필 이미지 url", "userType": "user", "createdAt": "2023-03-20T16:27:35.255Z", "updatedAt": "2023-03-21T07:19:32.821Z", "__v": 0}}]
 */

// 사용자 정보 조회
myRouter.get(
  "/:id",
  authMiddleware.verifyAuthorizedUser("params"),
  userMiddleware.checkUserIdFrom("params"),
  userController.getUser
);

// 개설한 게시글 조회
// /recruitment로 하면 사용자 정보조회로 넘어감
myRouter.get(
  "/all/recruitments",
  authMiddleware.verifyLogin,
  recruitmentController.getMyRecruitments
);

// 참여한 게시글 조회
//myRouter.get();

module.exports = myRouter;
