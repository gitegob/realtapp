import { Bid } from '../entities/bid.entity';

export class BidResponse {
  rows: Bid[];
  page: number;
  itemsPerPage: number;
  totalCount: number;
}
