"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProfileType = exports.ProfileTypeMap = exports.ProfileTypeEnum = void 0;
var ProfileTypeEnum;
(function (ProfileTypeEnum) {
    ProfileTypeEnum[ProfileTypeEnum["ADMIN"] = 1] = "ADMIN";
    ProfileTypeEnum[ProfileTypeEnum["USER"] = 2] = "USER";
})(ProfileTypeEnum = exports.ProfileTypeEnum || (exports.ProfileTypeEnum = {}));
exports.ProfileTypeMap = [ProfileTypeEnum.ADMIN, ProfileTypeEnum.USER];
const isProfileType = (value) => exports.ProfileTypeMap.includes(value);
exports.isProfileType = isProfileType;
