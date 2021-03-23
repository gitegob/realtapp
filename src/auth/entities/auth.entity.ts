import { House } from '../../house/entities/house.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Bid } from '../../bid/entities/bid.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @OneToMany(() => House, (house) => house.owner)
  houses: House[];
  @OneToMany(() => Bid, (bid) => bid.bidder)
  bids: Bid[];
}
