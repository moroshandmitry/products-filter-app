import { createContext } from 'react';

const CatalogContext = createContext({});

export const CatalogProvider = CatalogContext.Provider;
export default CatalogContext;
