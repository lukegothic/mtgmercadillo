import React, { useEffect, useState, useRef, useReducer } from 'react';
import { getCards } from 'services/database-service/CardsService';
import AlbumSell from 'ui/components/AlbumSell';
import { sortVentaMode } from 'ui/_functions/Collection';
import logoanim from 'assets/logo_anim.gif';
import Filters from 'ui/components/Filters';
import AlbumType from 'ui/_functions/AlbumType';
import Album from 'ui/components/Album';

const SellPage = () => {
    const [collection, setCollection] = useState(null);
    const [filters, setFilters] = useState({ name: null, set: null });
    useEffect(() => {
        const load = async () => {
            const cards = await getCards("trade");
            cards.sort(sortVentaMode);
            setCollection(cards);
        }
        load();
      }, []);

    return (
        <>
            { collection ? <Album collection={collection} filters={filters} type={AlbumType.SELL} /> : <img src={logoanim} alt="logo"></img> }
            <Filters filters={filters} setFilters={setFilters} />
        </>
    );
}

export default SellPage;