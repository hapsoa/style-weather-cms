export interface ClothesGroupData {
  // uid: string | null;
  // email: string | null;
  // createdAt: number | null;
  // updatedAt: number | null;
  t: string;
}

export default class ClothesGroup implements ClothesGroupData {
  public t: string = '';
}
