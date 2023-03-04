import React, { useEffect, useState, useReducer } from 'react';
import { getCards } from 'services/database-service/CardsService';
import { searchScryfall  } from 'services/scryfall-service/ScryfallService';
import { sortInventoryMode } from 'ui/_functions/Collection';
import FolderContext from 'ui/_functions/contexts/FolderContext';
import CollectionContext from 'ui/_functions/contexts/CollectionContext';
import InventoryArticleNewContext from 'ui/_functions/contexts/InventoryArticleNewContext';
import logoanim from 'assets/logo_anim.gif';

import Filters from 'ui/components/Filters';
import FolderSelector from 'ui/components/FolderSelector';
import CollectionReducer from 'ui/_functions/reducers/CollectionReducer';
import Album from 'ui/components/Album';
import AlbumType from 'ui/_functions/AlbumType';

// paginacion: https://codesandbox.io/s/searchablelist-9erd0?file=/src/App.js:1005-1113
// estrategia de carga: cargar la info de las cartas que se muestren

const InventoryPage = () => {
  // inventario online scryfall???
  // decks en scryfall! https://api.scryfall.com/decks/a30b37f8-23aa-4ccc-a1e9-758f1a281876/export/json
  const [folder, setFolder] = useState(null);
  const [articleNew, setArticleNew] = useState({ foil: false, language: "EN", condition: "NM", quantity: 0, customprice: null });
  const [collection, collectionDispatcher] = useReducer(CollectionReducer);
  const [fakeCollection, setFakeCollection] = useState(null);
  const [filters, setFilters] = useState({ name: null, set: null });
  useEffect(() => {
    const load = async () => {
      //ScryfallDB.current = await getCompactScryfallDatabase();
      //ScryfallSets.current = await getSets();
      !folder && setFolder("trade");
    }
    load();
  }, []);
  useEffect(() => {
    const loadFakeCollection = async () => {
          // // TODO: permitir filtrar por set!!!!! para inventariar sets enteros
          // ya se puede con e:set y todo el monario de scryfall
          if (filters.name) {
          const scryfall_search = await searchScryfall(filters.name);
          const collection_ids = collection.map(card => card.id);
          const cards_x_scryfall = scryfall_search.filter(c => !collection_ids.includes(c.id)).map(card => ({
              articles: [],
              ...card
          }));
          //cards_x_scryfall.sort(sortInventoryMode);
          setFakeCollection(cards_x_scryfall);
          } else {
          setFakeCollection(null);
          }
      }
      loadFakeCollection();
    }, [filters, collection]);
    useEffect(() => {
    const loadFolder = async () => {
        if (folder) {
          const cards = await getCards(folder);
          cards.sort(sortInventoryMode);
          collectionDispatcher({ type: "reset", payload: cards });
        }
    }
    loadFolder();
    }, [folder]);

    return (
      <CollectionContext.Provider value={{ collection, collectionDispatcher }}>
        <FolderContext.Provider value={{ folder, setFolder }}>
          <InventoryArticleNewContext.Provider value={{ articleNew, setArticleNew }}>
            <FolderSelector></FolderSelector>
            { collection ? <Album collection={collection} folder={folder} filters={filters} type={AlbumType.INVENTORY} /> : <img src={logoanim} alt="logo"></img>}
            { fakeCollection && fakeCollection.length > 0 && <><h3>Available to add</h3><Album collection={fakeCollection} type={AlbumType.FAKE} /></>}
            <Filters filters={filters} setFilters={setFilters} />
          </InventoryArticleNewContext.Provider>
        </FolderContext.Provider>
      </CollectionContext.Provider>
    );
}
export default InventoryPage;