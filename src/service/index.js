const postService = require("./postService");
const recruitmentService = require("./recruitmentService");
const allAccidentTypeService = require("./allAccidentTypeService");
const ageTimeAccidentService = require("./ageTimeAccidentService");
const carAndPeoService = require("./carAndPeoService");
const seoulAccidentCasesService = require("./seoulAccidentCasesService");
const seoulCarAndPeoCasesService = require("./seoulCarAndPeoCasesService");
const seoulTeenagerAccidentService = require("./seoulTeenagerAccidentService");
const teenagerAccidentService = require("./teenagerAccidentService");
const teenagerTimeAccidentService = require("./teenagerTimeAccidentService");
const boardService = require("./boardService");
const userService = require("./userService");

module.exports = {
  postService,
  boardService,
  userService,
  recruitmentService,
  allAccidentTypeService,
  ageTimeAccidentService,
  carAndPeoService,
  seoulAccidentCasesService,
  seoulCarAndPeoCasesService,
  seoulTeenagerAccidentService,
  teenagerAccidentService,
  teenagerTimeAccidentService,
};
