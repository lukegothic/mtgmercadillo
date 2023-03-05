import { useContext, useState, useEffect, useRef } from 'react';
import AlbumPaginator from './AlbumPaginator';
import Card from "./Card";
import CardSell from "./CardSell";
const PAGE_ITEMS = 60;
// TODO: multiples albunes? modern legacy edh foil, custom search... etc.
const AlbumSell = ({ collection, filter }) => {
    // TODO: paginacion smart: colores y nombre?
    const [page, setPage] = useState(1);
    // TODO: forma inteligente de separar? foils por un lado etc etc
    const articles = collection.reduce((acc, i) => acc.concat(i.articles.filter(a => a.quantity > 0).map(a => ({ ...i, article: a }))), []);
    const [filteredArticles, setFilteredArticles] = useState(articles);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);
    useEffect(() => {
        setFilteredArticles(articles.filter(card => !filter || (filter.toLowerCase() && card.name.toLowerCase().indexOf(filter) !== -1)));
        setPage(1);
    }, [filter]);
    return <>
        <div className={`album album-sell`}>
        { filteredArticles
            .slice((page - 1) * PAGE_ITEMS, (page - 1) * PAGE_ITEMS + PAGE_ITEMS)
            .map((card, i) => <Card key={i} card={card} article={card.article}><CardSell card={card} article={card.article} /></Card>) }
     </div>
     <AlbumPaginator listSize={filteredArticles.length} itemsPerPage={PAGE_ITEMS} page={page} setPage={setPage} />
    </>
}
export default AlbumSell;