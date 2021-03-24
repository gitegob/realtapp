import { User } from '../../auth/entities/auth.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Bid } from '../../bid/entities/bid.entity';

@Entity('houses')
export class House {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ['AVAILABLE', 'TAKEN'],
    nullable: false,
    default: 'AVAILABLE',
  })
  status: 'AVAILABLE' | 'TAKEN';

  @Column('text', { array: true })
  pictures: string[];

  @ManyToOne(() => User, (user: User) => user.houses)
  owner: User;

  @OneToMany(() => Bid, (bid: Bid) => bid.house, {
    onDelete: 'CASCADE',
  })
  bids: Bid[];
}
