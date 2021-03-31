import { User } from './../../auth/entities/auth.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { House } from '../../house/entities/house.entity';
import { BidStatus } from '../../shared/interfaces/enum.interface';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  price: number;

  @Column({
    enum: BidStatus,
    nullable: false,
    default: BidStatus.PENDING,
  })
  status: BidStatus;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.bids, { onDelete: 'CASCADE' })
  bidder: User;
  @ManyToOne(() => House, (house) => house.bids, { onDelete: 'CASCADE' })
  house: House;
}
