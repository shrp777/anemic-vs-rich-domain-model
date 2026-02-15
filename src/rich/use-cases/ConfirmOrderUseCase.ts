import type { Order } from "../aggregates/Order";

export class ConfirmOrderUseCase {
  execute(order: Order) {
    //charger via repository, transaction, save, etc.
    order.confirm();
  }
}
