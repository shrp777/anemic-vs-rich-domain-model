import type { MoneyVO } from "../value-objects/MoneyVO";

// Aggregate Root: Order
export class Order {
  private _status: OrderStatus = "DRAFT";
  private _lines: OrderLine[] = [];
  private _discountRate = 0; // 0..0.30

  constructor(public readonly id: OrderId) {}

  get status() {
    return this._status;
  }

  get lines(): readonly OrderLine[] {
    return this._lines;
  }

  get discountRate() {
    return this._discountRate;
  }

  addLine(productId: ProductId, unitPrice: MoneyVO, quantity: number) {
    this.assertDraft();
    // exemple: fusionner si même produit + même prix (simplification)
    const existing = this._lines.find(
      (l) =>
        l.productId === productId && l.unitPrice.amount === unitPrice.amount
    );
    if (existing) {
      existing.changeQuantity(existing.quantity + quantity);
      return;
    }
    this._lines.push(new OrderLine(productId, unitPrice, quantity));
  }

  setDiscountRate(rate: number) {
    this.assertDraft();
    if (!Number.isFinite(rate) || rate < 0 || rate > 0.3) {
      throw new Error("Discount must be between 0% and 30%");
    }
    this._discountRate = rate;
  }

  total(): MoneyVO {
    const sum = this._lines.reduce(
      (acc, l) => acc.add(l.lineTotal()),
      MoneyVO.eur(0)
    );
    return sum.multiply(1 - this._discountRate);
  }

  confirm() {
    this.assertDraft();
    if (this._lines.length === 0)
      throw new Error("Order must have at least one line");
    if (this.total().amount <= 0) throw new Error("Total must be > 0");
    this._status = "CONFIRMED";
  }

  private assertDraft() {
    if (this._status !== "DRAFT")
      throw new Error("Order is not editable once confirmed");
  }
}
