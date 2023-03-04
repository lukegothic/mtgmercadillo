import React from 'react';
import CardInventoryArticle from './CardInventoryArticle';
import CardInventoryArticleNew from './CardInventoryArticleNew';

const CardInventory = ({ card }) => {
    return (
        <div className="article-inventory-holder">
            { card.articles.map((article, i) => <CardInventoryArticle key={`${card.id}_${article.foil}_${article.language}_${article.condition}`} card={card} article={article} />) }
            <CardInventoryArticleNew card={card} />
        </div>
    );
}
export default CardInventory;