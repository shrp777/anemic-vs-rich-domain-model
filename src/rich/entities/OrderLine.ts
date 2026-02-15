import type { ProductId } from "../types";
import type { MoneyVO } from "../value-objects/MoneyVO";

export class OrderLine {
  constructor(
    public readonly productId: ProductId,
    public readonly unitPrice: MoneyVO,
    private _quantity: number
  ) {
    if (!Number.isInteger(_quantity) || _quantity <= 0) {
      throw new Error("Quantity must be a positive integer");
    }
  }

  get quantity() {
    return this._quantity;
  }

  changeQuantity(qty: number) {
    if (!Number.isInteger(qty) || qty <= 0)
      throw new Error("Quantity must be a positive integer");
    this._quantity = qty;
  }

  lineTotal(): MoneyVO {
    return this.unitPrice.multiply(this._quantity);
  }
}
