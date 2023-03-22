const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const schema = Joi.object({
  borough: JoiObjectId().required(),
  title: Joi.string().required(),
  author: JoiObjectId(),
  comment: Joi.string(),
  volunteerTime: Joi.string().required(),
  recruitments: Joi.number().required(),
  content: Joi.string().required(),
  category: Joi.string().required(),
  address: Joi.string().required(),
  image: Joi.string(),
  meetingStatus: Joi.string().required(),
  participants: Joi.array().items(JoiObjectId()).default([]),
});

const checkCompleteRecruitmentFrom = (from) => async (req, res, next) => {
  const {
    borough,
    title,
    comment,
    volunteerTime,
    recruitments,
    content,
    image,
    address,
    category,
    meetingStatus,
    participants,
  } = req[from];
  try {
    await schema.validateAsync({
      borough,
      title,
      comment,
      volunteerTime,
      recruitments,
      content,
      image,
      address,
      category,
      meetingStatus,
      participants,
    });
    next();
  } catch (error) {
    const result = Object.entries(req[from]).reduce((map, [key, value]) => {
      map += `[${key} : ${value}] `;
      return map;
    }, "");
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${result}: 유효한 데이터 셋이 아닙니다.`
      )
    );
  }
};

const checkRecruitmentIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];
  try {
    if (id === undefined) {
      throw new AppError(
        commonErrors.inputError,
        400,
        `${from}: id는 필수값입니다.`
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkMinRecruitmentConditionFrom = (from) => (req, res, next) => {
  const {
    borough,
    title,
    comment,
    volunteerTime,
    recruitments,
    content,
    author,
    image,
    address,
    category,
    meetingStatus,
    participation,
  } = req[from];
  try {
    if (
      borough === undefined &&
      title === undefined &&
      content === undefined &&
      author === undefined &&
      comment === undefined &&
      volunteerTime === undefined &&
      recruitments === undefined &&
      image === undefined &&
      address === undefined &&
      category === undefined &&
      meetingStatus === undefined &&
      participation === undefined
    ) {
      throw new AppError(
        commonErrors.inputError,
        400,
        `${from}: 값이 최소 하나는 필요합니다.`
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCompleteRecruitmentFrom,
  checkRecruitmentIdFrom,
  checkMinRecruitmentConditionFrom,
};
