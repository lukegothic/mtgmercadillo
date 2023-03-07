import { useState, useEffect } from 'react';
import AlbumPaginator from './AlbumPaginator';
import Card from "./Card";
import CardSell from "./CardSell";
import CardInventory from './CardInventory';
import AlbumType from 'ui/_functions/AlbumType';
import { useUpdateEffect } from 'react-use';

// TODO: multiples albunes? modern legacy edh foil, custom search... etc.
const Album = ({ collection, filter, type = AlbumType.SELL }) => {
    const PAGE_ITEMS = type === AlbumType.SELL ? 60 : 180;
    // TODO: paginacion smart: colores y nombre? sets?
    const [page, setPage] = useState(1);
    // TODO: forma inteligente de separar (solo en venta)? foils por un lado etc etc
    // si es sell separamos articulos!!
    if (type === AlbumType.SELL) {
        collection = collection.reduce((acc, i) => acc.concat(i.articles.filter(a => a.quantity > 0).map(a => ({ ...i, article: a }))), []);
    }
    const [filteredCollection, setFilteredCollection] = useState(collection);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);
    useUpdateEffect(() => {
        // TODO: Super hacky para inventariar sets, hacerlo bien
        if (filter) {
            const lowerFilter = filter.toLowerCase();
            if (filter.indexOf("s:") !== -1) {
                const set_code = filter.replace("s:", "");
                setFilteredCollection(collection.filter(card => card.set === set_code));
            } else {
                setFilteredCollection(collection.filter(card => card.name.toLowerCase().indexOf(lowerFilter) !== -1));
            }
            setPage(1);
        } else {
            setFilteredCollection(collection);
        }
    }, [filter]);  // BUG: si dependo de colleciton hace pintados infinitos en SellPage pero necesito escucharla...
    return <>
        <div className={`album album-${type}`}>
        { filteredCollection
            .slice((page - 1) * PAGE_ITEMS, (page - 1) * PAGE_ITEMS + PAGE_ITEMS)
            .map((card, i) => <Card key={i} card={card} article={card.article}>
                { type === AlbumType.SELL ? <CardSell card={card} article={card.article} /> : <CardInventory card={card} /> }
            </Card>) }
     </div>
     <AlbumPaginator listSize={filteredCollection.length} itemsPerPage={PAGE_ITEMS} page={page} setPage={setPage} />
    </>
}
export default Album;