import { House } from '../entities/house.entity';

export class HouseResponse {
  rows: House[];
  page: number;
  itemsPerPage: number;
  totalCount: number;
}
