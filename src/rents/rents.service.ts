import { BadRequestException, Injectable } from '@nestjs/common';
import { RentsRepository } from './repository/rents.repository';

@Injectable()
export class RentsService {
  constructor(private readonly rentsRepository: RentsRepository) { }

  async create(createRentDTO) {
    const bookIsRented = await this.rentsRepository.checkIfTheBookIsRented(
      createRentDTO.book_id,
    );

    if (bookIsRented) {
      throw new BadRequestException();
    }

    return await this.rentsRepository.create(createRentDTO);
  }
}
