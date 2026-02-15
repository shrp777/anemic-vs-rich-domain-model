# Anemic Domain Model vs Rich Domain Model

## Problèmes typiques d'un Anemic Domain Model

- On peut facilement contourner les règles : order.discountRate = 0.9 sans contrôle.
- Les invariants sont dispersés (plusieurs services, contrôleurs, jobs…).
- L’objet “domaine” ne protège pas son état.

## Bénéfices d'un Rich Domain Model

- L’objet empêche les états invalides (encapsulation).
- Les invariants sont au même endroit que les données qu’ils protègent.
- Les services applicatifs deviennent de l’orchestration (chargement, transaction, persistance), pas de la “règle métier”.

## En résumé

- Anémique : les règles sont autour des données.
- Riche : les règles sont dans l’objet qui porte l’état.

![alt Anemic vs Rich Domain Model](assets/anemic_vs_rich.jpg)

Crédit image : <https://thevaluable.dev/anemic-domain-model/>

--

!["Logotype Shrp"](https://sherpa.one/images/sherpa-logotype.png)

__Alexandre Leroux__  
_Enseignant / Formateur_  
_Développeur logiciel web & mobile_

Nancy (Grand Est, France)

<https://shrp.dev>
