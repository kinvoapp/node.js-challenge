export interface IMovement {
  _id?: any;
  id?: string;
  name: string;
  description?: string;
  formOfPayment?: number;
  type: number;
  value: any;
  date?: any;
  deletedAt?: Date | null;
}