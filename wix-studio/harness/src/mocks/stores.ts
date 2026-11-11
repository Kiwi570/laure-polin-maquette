import { produits, attendre } from './donnees';

export const productsV3 = {
  async queryProducts(q: { filter?: { _id?: { $in?: Array<string> } } }) {
    const ids = q?.filter?._id?.$in || [];
    return attendre({ products: produits.filter((p) => ids.includes(p._id)), pagingMetadata: {} });
  },
  async getProduct(id: string) {
    return attendre({ _id: id, variantsInfo: { variants: [{ _id: `v-${id}` }] } }, 30);
  },
};
