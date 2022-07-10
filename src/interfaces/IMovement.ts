export interface IMovement {
  name: string;
  description?: string;
  formOfPayment?: number;
  type: number;
  value: any;
  date?: Date;
  deletedAt?: Date | null;
}