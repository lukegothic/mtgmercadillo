// TODO: relative path to src
import { useContext } from "react";
import FolderContext from "../_functions/contexts/FolderContext";
import { updateArticle } from "../../services/database-service/CardsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const CardInventoryArticle = ({ card, article }) => {
    const { folder } = useContext(FolderContext);
    const HandleChangeQuantity = async e => {
        article.quantity =  e.target.value ? parseInt(e.target.value) : 0;
        await updateArticle({ folder, card, article });
    }
    const HandleChangePrice = async e => {
        article.customprice = e.target.value ? parseFloat(e.target.value) : "";
        await updateArticle({ folder, card, article });
    }
    return <div className={`article-inventory-entry ${article.quantity === 0 ? "article-inventory-entry-empty" : ""}`}>
        <FontAwesomeIcon icon={faEllipsisVertical} className="draggable" />
        <input type="number" className="article-quantity-edit xsmall" min={0} step={1} defaultValue={article.quantity} onBlur={HandleChangeQuantity}></input>
        <i className={`icon flag-${article.language}`} />
        <span className={`badge condition condition-${article.condition}`}>{article.condition}</span>
        <i className={`icon foil-${article.foil ? 1 : 0}`} />
        <input type="number" className='article-customprice-edit small' min={0.49} step={0.5} defaultValue={article.customprice || ""} placeholder={(Array.isArray(card.prices) ? card.prices[article.foil ? 1 : 0] : card.prices[article.foil ? "eur_foil" : "eur"])} onBlur={HandleChangePrice}></input>
    </div>;
}
export default CardInventoryArticle;