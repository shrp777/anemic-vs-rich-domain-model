import type { Order } from "./entities/Order";
import { OrderService } from "./services/OrderService";

const order: Order = { id: "O1", status: "DRAFT", lines: [], discountRate: 0 };

const svc = new OrderService();
svc.addLine(order, "PIZZA_MARGHERITA", { amount: 12, currency: "EUR" }, 2);
svc.setDiscount(order, 0.1);
svc.confirm(order);

// Contournement facile
// modification directe des données, sans contrôle
order.discountRate = 0.9; // application directe d'une réduction sans vérification logique

order.lines[0].quantity = -100; // accès invalide -> la valeur order.lines[0] peut être undefined
//Erreur affichée dans l'onglet Problèmes : L'objet a peut-être la valeur 'undefined'.

/*Problèmes typiques
- On peut facilement contourner les règles : order.discountRate = 0.9 sans contrôle.
- Les invariants sont dispersés (plusieurs services, contrôleurs, jobs…).
- L’objet “domaine” ne protège pas son état.
*/
