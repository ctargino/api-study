import { container } from 'tsyringe';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import UserFavoriteProductRepository from '@modules/users/infra/typeorm/repositories/UserFavoriteProductRepository';
import IUserFavoriteProductRepository from '@modules/users/repositories/IUserFavoriteProductRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserFavoriteProductRepository>(
  'UserFavoriteProductRepository',
  UserFavoriteProductRepository,
);
