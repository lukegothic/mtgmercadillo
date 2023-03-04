import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

const CardSell = ({ card, article }) => {
    const price = card.prices[article.foil ? 1 : 0];
    const whole = parseInt(price);
    const remainder = price - whole;
    return (<div className="article-shop-holder">
        <div className="article-price-holder">
            <sub className="article-price-whole">{whole}</sub>
            <sub className="article-price-remainder">{remainder.toFixed(2).slice(-3)}</sub> <span className="article-price-euro">€</span>
        </div>
        <div className="article-actions-holder">
            <button className="action article-action-addtocart">
                <FontAwesomeIcon icon={faCartArrowDown} /> <span>Añadir al carro</span>
            </button>
        </div>
    </div>);
}
export default CardSell;