import type { OrderLine } from "../entities/OrderLine";
import type { OrderStatus } from "../types";
import type { OrderId } from "../types";

export class Order {
  constructor(
    public id: OrderId,
    public status: OrderStatus,
    public readonly lines: OrderLine[],
    public discountRate: number // ex: 0.10 pour 10%
  ) {}
}
