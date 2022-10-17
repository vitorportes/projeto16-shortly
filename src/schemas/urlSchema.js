import joi from 'joi';

const urlPattern =
  /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

export const urlSchema = joi.object({
  url: joi.string().regex(urlPattern).required(),
});
