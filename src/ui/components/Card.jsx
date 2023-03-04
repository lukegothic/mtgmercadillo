import { sortArticles } from "../_functions/Article";

export default ({ card, article, children }) => {
    card.articles.sort(sortArticles);
    const img_src = typeof card.image_uris === "string" ? `https://c1.scryfall.com/file/scryfall-cards/small/front/${card.image_uris}` : ("image_uris" in card ? card.image_uris.small : card.card_faces[0].image_uris.small);
    return <div className={`article`}>
        <div className="article-image-holder">
            <img className="article-image" loading="lazy" alt={card.name} src={img_src}></img>
        </div>
        <div className="article-data-holder">
            <div className="article-name-holder"><span className="article-name">{card.name}</span></div>
            {children}
        </div>
    </div>;
}