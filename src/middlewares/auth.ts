import { Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
import hash from '../config/secret.json';

const auth = (req: Request, res: Response, next) => {
  const header = req.headers.authorization;
  if(!header){
    return res.status(401).send({ error: 'Token de autenticação inválido' });
  }
  const [bearer, token] = header.split(' ');
  jwt.verify(token, hash.auth, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token de autenticação inválido' });
    }
    return next();  
  })
}

const eventPermission = (req: Request, res: Response, next) => {
  const header = req.headers.authorization;
  const [bearer, token] = header.split(' ');
  jwt.verify(token, hash.auth, (err, decoded) => {
   
    if (err) {
      return res.status(401).send({ error: 'Token de autenticação inválido' });
    }
    if( (<any>decoded).role !== 'organizadorEventos'){
      return res.status(403).send({error: 'Você nao possui permissão para realizar esta ação'})
    }

    return next();  
  })
}

export {auth, eventPermission};