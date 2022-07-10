export interface IMovement {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  formOfPayment?: number;
  type: number;
  value: any;
  date?: Date;
  deletedAt?: Date | null;
}