import { User } from './../../auth/entities/auth.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { House } from '../../house/entities/house.entity';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  price: number;

  @ManyToOne(() => User, (user) => user.bids, { onDelete: 'CASCADE' })
  bidder: User;
  @ManyToOne(() => House, (house) => house.bids, { onDelete: 'CASCADE' })
  house: House;
}
