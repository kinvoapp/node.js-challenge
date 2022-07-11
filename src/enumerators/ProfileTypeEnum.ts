export enum ProfileTypeEnum {
  ADMIN = 1,
  USER = 2,
}

export const ProfileTypeMap = [ ProfileTypeEnum.ADMIN, ProfileTypeEnum.USER ];

export const isProfileType = (value: number) => ProfileTypeMap.includes(value);
