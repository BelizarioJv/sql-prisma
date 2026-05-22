import { Customer } from "../models/Customer.js";

export const customerController = {
  index: async (req, res) => {
    const customers = Customer.findAll();
    res.json(customers);
  },

  save: async (req, res) => {
    const newCustomer = new Customer(req.body);
    res.status(201).json();
  },

  show: async (req, res) => {
    const id = req.params.id;
    constumer = Customer.findById(id);
  },

  update: async (req, res) => {
    const id = req.params.id;
    const attributes = req.body;

    updatedCustomer = Customer.update(id, attributes);
    res.status(200).send({ json });
  },

  delete: async (req, res) => {
    const id = req.params.id;

    const deleteCustomer = Customer.delete(id);
    res.status(200);
  },
};
