import React, { useState, useReducer } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';
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
import AlbumFake from 'ui/components/AlbumFake';

// paginacion: https://codesandbox.io/s/searchablelist-9erd0?file=/src/App.js:1005-1113
// estrategia de carga: cargar la info de las cartas que se muestren

const loadFolder = async (folder, dispatcher) => {
  if (folder) {
    const cards = await getCards(folder);
    cards.sort(sortInventoryMode);
    dispatcher({ type: "reset", payload: cards });
  }
}

const loadFakeCollection = async (filter, collection, setFakeCollection) => {
  // // TODO: permitir filtrar por set!!!!! para inventariar sets enteros
  // ya se puede con e:set y todo el monario de scryfall
  if (filter) {
    const scryfall_search = await searchScryfall(filter);
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

const InventoryPage = () => {
  const [folder, setFolder] = useState(null);
  const [articleNew, setArticleNew] = useState({ foil: false, language: "EN", condition: "NM", quantity: 0, customprice: null });
  const [collection, collectionDispatcher] = useReducer(CollectionReducer);
  const [fakeCollection, setFakeCollection] = useState(null);
  const [filter, setFilter] = useState('');
  useEffectOnce(() => {
    const load = async () => {
      //ScryfallDB.current = await getCompactScryfallDatabase();
      //ScryfallSets.current = await getSets();
      !folder && setFolder("trade");
    }
    load();
  });

  useUpdateEffect(() => {
    loadFakeCollection(filter, collection, setFakeCollection);
  }, [filter]);

  useUpdateEffect(() => {
    loadFolder(folder, collectionDispatcher);
  }, [folder]);

  useUpdateEffect(() => {
  }, [fakeCollection]);

    return (
      <CollectionContext.Provider value={{ collection, collectionDispatcher }}>
        <FolderContext.Provider value={{ folder, setFolder }}>
          <InventoryArticleNewContext.Provider value={{ articleNew, setArticleNew }}>
            <FolderSelector />
            { collection ? <Album collection={collection} folder={folder} filter={filter} type={AlbumType.INVENTORY} /> : <img src={logoanim} alt="logo"></img>}
            { fakeCollection && fakeCollection.length > 0 && <AlbumFake collection={fakeCollection}></AlbumFake> }
            <Filters filter={filter} setFilter={setFilter} />
          </InventoryArticleNewContext.Provider>
        </FolderContext.Provider>
      </CollectionContext.Provider>
    );
}
export default InventoryPage;