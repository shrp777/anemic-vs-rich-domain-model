import type { ProductId, Money } from "../types";

export class OrderLine {
  constructor(
    public productId: ProductId,
    public unitPrice: Money,
    public quantity: number
  ) {}
}
