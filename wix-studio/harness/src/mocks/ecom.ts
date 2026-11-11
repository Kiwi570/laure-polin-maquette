import { attendre } from './donnees';

const lignes: Array<{ catalogReference: { catalogItemId: string }; quantityInfo: { requestedQuantity: number } }> = [];
export const currentCartV2 = {
  async getCurrentCart() { return attendre({ cart: { lineItems: lignes } }); },
  async addLineItemsToCurrentCart(o: { catalogItems: Array<{ catalogReference: { catalogItemId: string }; quantity: number }> }) {
    o.catalogItems.forEach((it) => {
      const l = lignes.find((x) => x.catalogReference.catalogItemId === it.catalogReference.catalogItemId);
      if (l) l.quantityInfo.requestedQuantity += it.quantity;
      else lignes.push({ catalogReference: { catalogItemId: it.catalogReference.catalogItemId }, quantityInfo: { requestedQuantity: it.quantity } });
    });
    return attendre({ cart: { lineItems: lignes } }, 200);
  },
};
