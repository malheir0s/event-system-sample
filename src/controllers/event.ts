import { Request, Response } from "express";
import { event } from "../models/event";
import axios from "axios";

class EventController {
  async create(req: Request, res: Response) {

    var object = JSON.parse(req.body.text);
    console.log(object)
    const file = {
      name: (<any>req).file.originalname,
      size: (<any>req).file.size,
      key: (<any>req).file.filename,
    };

    try {
      const newEvent = await event.create({
        title: object.title,
        description: object.description,
        price: object.price,
        date: object.date,
        img: file,
      });
      return res.status(201).send(newEvent);
    } catch (err) {
      return res.send(err)
    }
  }

  async listAll(req: Request, res: Response) {
    const search = await event.find();
    return res.json(search);
  }

  async listByTitle(req: Request, res: Response) {
    const search = await event.find({ title: { "$regex": req.params.title } });
    return res.json(search);
  }

  async generateBill(req: Request, res: Response) {
    const date = new Date();
    const day = String(date.getDate() + 4)
    const month = String(date.getMonth() + 1)
    const year = date.getFullYear();

    const dueDate = day + '/' + month + '/' + year;

    const Event: any = event.findById(req.params.id);
    const data = {
      reference: Event.title,
      firstDueDate: dueDate,
      numberOfPayments: 1,
      periodicity: 'monthly',
      amount: Event.price,
      description: Event.description,
      customer: {
        document: {
          type: "CPF",
          value: req.body.CPF
        },
        name: req.body.name,
        email: req.body.email,
        phone:{
          areaCode: req.body.areaCode,
          number: req.body.phoneNumber
        }
      }
    }
    // pagamento pagseguro
    axios.post(`https://ws.pagseguro.uol.com.br/recurring-payment/boletos?email=${process.env.EMAIL}&token=${process.env.TOKEN}`, data)
    .then(response=>{
      return res.status(200).json(response.data.boletos)
    }).catch(error =>{
        return res.status(error.response.status).send({error})
    })

  }
}

export { EventController };