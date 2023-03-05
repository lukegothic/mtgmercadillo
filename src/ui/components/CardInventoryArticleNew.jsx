// TODO: relative path to src
import { useContext, useRef } from "react";

import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FolderContext from "ui/_functions/contexts/FolderContext";
import CollectionContext from "ui/_functions/contexts/CollectionContext";
import InventoryArticleNewContext from "ui/_functions/contexts/InventoryArticleNewContext";
import { nextLanguage, nextCondition } from "ui/_functions/Article";

import { updateArticle } from "services/database-service/CardsService";

const CardInventoryArticleNew = ({ card }) => {
    const { articleNew, setArticleNew } = useContext(InventoryArticleNewContext);
    const { folder } = useContext(FolderContext);
    const { collectionDispatcher } = useContext(CollectionContext);
    const quantityInput = useRef(null);
    const custompriceInput = useRef(null);
    const HandleFormSubmit = async e => {
        e.preventDefault();
        const quantity = quantityInput.current.value ? parseInt(quantityInput.current.value) : 1;
        const customprice = custompriceInput.current.value ? parseFloat(custompriceInput.current.value) : null;
        const article = { 
            ...articleNew, 
            quantity,
            customprice
        };
        await updateArticle({
            folder,
            card,
            article
        });
        collectionDispatcher({ type: "insert", payload: { card, article }});
    }
    const HandleLanguageChange = e => {
        setArticleNew({...articleNew, language: nextLanguage(articleNew.language) });
    }
    const HandleConditionChange = e => {
        setArticleNew({ ...articleNew, condition: nextCondition(articleNew.condition) });
    }
    const HandleFoilChange = e => {
        setArticleNew({ ...articleNew, foil: !articleNew.foil });
    }
    return <form onSubmit={HandleFormSubmit}>
        <div className={`article-inventory-entry article-inventory-entry-empty`}>
            <div></div>
            <input ref={quantityInput} type="number" className="article-quantity-edit xsmall" min={0} step={1} defaultValue={""} placeholder={1}></input>
            <i className={`icon flag flag-${articleNew.language}`} onClick={HandleLanguageChange} />
            <span className={`badge condition condition-${articleNew.condition}`} onClick={HandleConditionChange}>{articleNew.condition}</span>
            <i className={`icon foil foil-${articleNew.foil ? 1 : 0}`} onClick={HandleFoilChange} />
            <input ref={custompriceInput} type="number" className='article-customprice-edit small' min={0.49} step={0.5} defaultValue={""} placeholder={card.prices[articleNew.foil ? "eur_foil" : "eur"]}></input>
            <button type="submit"><FontAwesomeIcon icon={faSave} /></button>
        </div>
    </form>
}
export default CardInventoryArticleNew;
