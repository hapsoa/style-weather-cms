export interface ClothData {
  // uid: string | null;
  // email: string | null;
  // createdAt: number | null;
  // updatedAt: number | null;
  t: string;
}

export default class Cloth implements ClothData {
  public t: string = '';
}
