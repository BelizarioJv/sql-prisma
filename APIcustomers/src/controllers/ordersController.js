import { Order } from "../models/Order.js";

export const orderController = {
  index: async (req, res) => {
    const orders = await Order.findAll();
    res.json(orders);
  },

  save: async (req, res) => {
    const newOrder = await Order.create(req.body.customerId, req.body.products);

    if (newOrder instanceof Order) {
      res.status(201).json(newOrder);
    } else {
      res.status(400).json(newOrder);
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);

      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedOrder = await Order.findByIdAndDelete(id);

      if (deletedOrder) {
        res.json({ message: "Order deleted successfully", deletedOrder });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
