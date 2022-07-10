export enum MovementTypeEnum {
  REVENUES = 1,
  EXPENSES = 2,
}

export const MovementTypeMap = [ MovementTypeEnum.REVENUES, MovementTypeEnum.EXPENSES ];

export const isMovementType = (value: number) => MovementTypeMap.includes(value);