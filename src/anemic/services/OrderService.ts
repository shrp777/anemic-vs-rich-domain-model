import type { Order } from "../entities/Order";
import type { ProductId, Money } from "../types";

export class OrderService {
  addLine(
    order: Order,
    productId: ProductId,
    unitPrice: Money,
    quantity: number
  ) {
    if (order.status !== "DRAFT")
      throw new Error("Cannot edit a confirmed order");
    if (quantity <= 0) throw new Error("Quantity must be > 0");
    if (unitPrice.amount < 0) throw new Error("Unit price must be >= 0");

    order.lines.push({ productId, unitPrice, quantity });
  }

  setDiscount(order: Order, rate: number) {
    if (order.status !== "DRAFT")
      throw new Error("Cannot edit a confirmed order");
    if (rate < 0 || rate > 0.3)
      throw new Error("Discount must be between 0% and 30%");
    order.discountRate = rate;
  }

  total(order: Order): Money {
    const sum = order.lines.reduce(
      (acc, l) => acc + l.unitPrice.amount * l.quantity,
      0
    );
    const discounted = sum * (1 - order.discountRate);
    return { amount: Math.round(discounted * 100) / 100, currency: "EUR" };
  }

  confirm(order: Order) {
    if (order.status !== "DRAFT") throw new Error("Already confirmed");
    if (order.lines.length === 0)
      throw new Error("Order must have at least one line");

    // règle exemple : total > 0
    const t = this.total(order);
    if (t.amount <= 0) throw new Error("Total must be > 0");

    order.status = "CONFIRMED";
  }
}
