import { useEffect, useState } from "react";
import AlbumPaginator from "./AlbumPaginator";
import Card from "./Card";
import CardInventory from "./CardInventory";
// TODO: Merge AlbumSell y AlbumInve
const PAGE_ITEMS = 180;
const AlbumInventory = ({ collection, filter, type="inventory" }) => {
    // TODO: paginacion, en este caso por set
    // TODO: paginacion smart: colores y nombre?
    const [page, setPage] = useState(1);
    // TODO: forma inteligente de separar? foils por un lado etc etc
    const [filteredCollection, setFilteredCollection] = useState(collection);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);
    useEffect(() => {
        setFilteredCollection(collection.filter(card => !filter (filter.toLowerCase() && card.name.toLowerCase().indexOf(filter) !== -1)));
        setPage(1);
    }, [filter, collection]);
    return (<><div className={`album album-${type}`}>
        { filteredCollection
            .slice((page - 1) * PAGE_ITEMS, (page - 1) * PAGE_ITEMS + PAGE_ITEMS)
            .map((card, i) => <Card key={i} card={card}><CardInventory card={card} /></Card>) }
        </div>
        <AlbumPaginator listSize={filteredCollection.length} itemsPerPage={PAGE_ITEMS} page={page} setPage={setPage} />
    </>)
}
export default AlbumInventory;