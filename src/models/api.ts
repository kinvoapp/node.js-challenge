import { RequestHandler } from "express";
import { ParamsDictionary } from 'express-serve-static-core'
export type requestAPI<T> = RequestHandler<ParamsDictionary, any, T>