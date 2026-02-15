export class MoneyVO {
  private constructor(
    public readonly amount: number,
    public readonly currency: "EUR"
  ) {}

  static format(amount: number) {
    // on force 2 décimales et on interdit les montants négatifs
    if (!Number.isFinite(amount)) throw new Error("Invalid amount");
    const rounded = Math.round(amount * 100) / 100;

    if (rounded < 0) throw new Error("Money cannot be negative");
    return new MoneyVO(rounded, "EUR");
  }

  add(other: MoneyVO): MoneyVO {
    this.assertSameCurrency(other);
    return MoneyVO.format(this.amount + other.amount);
  }

  multiply(factor: number): MoneyVO {
    if (!Number.isFinite(factor) || factor < 0)
      throw new Error("Invalid factor");
    return MoneyVO.format(this.amount * factor);
  }

  private assertSameCurrency(other: MoneyVO) {
    if (this.currency !== other.currency) throw new Error("Currency mismatch");
  }
}
