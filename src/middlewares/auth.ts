import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import auth  from '../config/auth';
import { UserAuthInfoRequest } from '../interfaces/UserAuthInfoRequest';

export default (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  //verifica se existe o header na requisição
  if(!authHeader)
    return res.status(401).send({ error: 'No Token Provided' });

  //separa o header em duas partes
  const parts = authHeader.split(' ');
  if(!(parts.length === 2))
    return res.status(401).send({ error: 'Token error'});

  //desestrutura o token e verifica se existe Bearer
  const [ scheme, token ] = parts;
  if(!/^Bearer$/.test(scheme))
    return res.status(401).send({ error: 'Token malformed' });

  jwt.verify(token, auth.secret, (err: any, decoded: any) => {
    if (err)
      return res.status(401).send({ error: 'Invalid Token'});

    req.userId = decoded.id;
    return next();
  })
};