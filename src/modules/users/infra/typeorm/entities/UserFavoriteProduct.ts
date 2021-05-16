import User from '@modules/users/infra/typeorm/entities/User';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('user_favorite_product')
export default class UserFavoriteProduct {
  @PrimaryColumn()
  product_id: number;

  @ManyToOne(() => User, user => user.user_id, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  added_at: Date;
}
