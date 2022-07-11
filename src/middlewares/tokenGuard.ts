import { IncomingHttpHeaders } from 'http';
import { RequestHandler } from 'express';
import { AccountService } from '../repositories/account/accountService';

const accountService = new AccountService();

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
  const header = headers.authorization;

  if (!header) throw new Error('missing auth token');

  return header.split(' ')[1];
}

export const tokenGuard: () => RequestHandler = () => (req, res, next) => {
  const token = getTokenFromHeaders(req.headers) || req.body.token || '';
  const hasAccess = accountService.verifyToken(token);

  if (!hasAccess) {
    res.status(403).send({ message: 'Um token é necessário.' });
    next();
  }
};
