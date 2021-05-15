import { Joi } from 'celebrate';

const _Joi = {
  number: Joi.number().integer().positive(),
  uuid: Joi.string().uuid({ version: 'uuidv4' }),
  uuidRequired: Joi.string().uuid({ version: 'uuidv4' }).required(),
};

export default _Joi;
