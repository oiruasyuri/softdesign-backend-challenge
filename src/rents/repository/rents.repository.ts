export abstract class RentsRepository {
  abstract create(createRentDTO);
  abstract checkIfTheBookIsRented(book_id: string): Promise<boolean>;
}
