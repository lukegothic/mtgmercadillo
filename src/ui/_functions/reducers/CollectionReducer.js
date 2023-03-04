const CollectionReducer = (state, action) => {
    switch(action.type) {
        case "reset":
            return action.payload;
        case "insert":
            // lanzado desde el componente InventoryArticleNew
            const newState = [...state];
            const existingCard = newState.find(c => c.id === action.payload.card.id);
            if (existingCard) {
                const existingArticle = existingCard.articles.find(a => a.foil === action.payload.article.foil && a.language === action.payload.article.language && a.condition === action.payload.article.condition);
                if (existingArticle) {
                    existingArticle.quantity += action.payload.article.quantity;
                    existingArticle.customprice = action.payload.article.customprice;
                } else {
                    existingCard.articles.push(action.payload.article);
                }
            } else {
                action.payload.card.articles.push(action.payload.article);
                newState.push(action.payload.card);
            }
            return newState;
        case "update":
            // TODO: para modificaciones desde inventario actual
            return state;
        case "remove":

            return state;
        default:
            throw Error();
    }
}
export default CollectionReducer;