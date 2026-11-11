import { categoriesMock, attendre } from './donnees';

export const categories = {
  async queryCategories(_q: unknown, o: { returnNonVisibleCategories?: boolean }) {
    const liste = categoriesMock.filter((c) => c.visible || o?.returnNonVisibleCategories);
    return attendre({ categories: liste.map((c) => ({ _id: c._id, name: c.name, slug: c.slug, visible: c.visible, itemCounter: c.ids.length })), pagingMetadata: {} });
  },
  async listItemsInCategory(id: string) {
    const c = categoriesMock.find((x) => x._id === id);
    return attendre({ items: (c?.ids || []).map((i) => ({ catalogItemId: `p-${i}`, appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e' })), pagingMetadata: { cursors: {} } });
  },
};
