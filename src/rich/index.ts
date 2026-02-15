import { MoneyVO } from "./value-objects/MoneyVO";
import { Order } from "./aggregates/Order";
import { ConfirmOrderUseCase } from "./use-cases/ConfirmOrderUseCase";

const order = new Order("O1");
order.addLine("PIZZA_MARGHERITA", MoneyVO.format(12), 2);
order.setDiscountRate(0.1);

new ConfirmOrderUseCase().execute(order);
console.log(order.status, order.total().amount);

/*
Bénéfices d'un Rich Domain Model
- L’objet empêche les états invalides (encapsulation).
- Les invariants sont au même endroit que les données qu’ils protègent.
- Les services applicatifs deviennent de l’orchestration (chargement, transaction, persistance), pas de la “règle métier”.
*/
