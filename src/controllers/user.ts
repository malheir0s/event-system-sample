import { Request, Response } from "express";
import { user } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import hash from '../config/secret.json';
import { userInfo } from "os";

class UserController {

  async create(req: Request, res: Response) {
    const userExists = await user.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(409).json({ error: "Email já cadastrado no sistema." })
    }
    try {
      const newUser: any = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      })
      newUser.password = undefined;
      return res.status(201).json(newUser)
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: "Ocorreu um erro ao cadastrar o usuário." })
    }
  }

  async login(req: Request, res: Response) {
    const User: any = await user.findOne({ email: req.body.email }).select("password role email name");

    if (!userInfo) {
      return res.status(404).send({ error: 'Usuário não encontrado no sistema.' });
    }

    if (! await bcrypt.compare(req.body.password, User.password)) {
      return res.status(401).send({ error: 'Usuário e senha não correspondem.' });
    }

    User.password = undefined;

    const token = jwt.sign({ id: User.id, role: User.role }, hash.auth, {
      expiresIn: 3600,
    });
    res.status(200).send({ User, token });
  }

}

export { UserController };