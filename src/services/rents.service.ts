import { Injectable } from '@nestjs/common';
import { RentsRepository } from 'src/repositories/rents.repository';

@Injectable()
export class RentsService {
  constructor(private readonly rentsRepository: RentsRepository) { }

  async create(createRentDTO) {
    return await this.rentsRepository.create(createRentDTO);
  }
}
