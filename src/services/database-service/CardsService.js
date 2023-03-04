import { realtime_db as db } from "./DatabaseService";
import { ref, set, get } from "firebase/database";
import { getCompactScryfallDatabase } from "services/scryfall-service/ScryfallService";

// se devuelve agrupado por id de carta por defecto.
// TODO: considerar devolver no agrupado
// TODO: devolver agrupado por oracle-id también
const articleDBtoArticles = (articleDB) => {
    let articlesById = [];
    for (let id in articleDB) {
        let articles = [];
        for (let foil in articleDB[id]) {
            for (let language in articleDB[id][foil]) {
                for (let condition in articleDB[id][foil][language]) {
                    articles.push({
                        //id,
                        // TODO: foil es 1 o 0 
                        foil: foil === "F",
                        language,
                        condition,
                        quantity: articleDB[id][foil][language][condition].quantity,
                        customprice: articleDB[id][foil][language][condition].customprice ?? null,
                    });
                }
            }
        }
        articlesById.push({ id, articles });
    }
    return articlesById;
};

let articlesdb_ref, articlesdb_snapshot;
let ScryfallDB;
export const getCards = async (collection) => {
    !ScryfallDB && (ScryfallDB = await getCompactScryfallDatabase());
    // TODO: load only requested collection
    articlesdb_ref = ref(db, `articles/${collection}`);
    articlesdb_snapshot = await get(articlesdb_ref);
    if (!articlesdb_snapshot.exists()) {
        return [];
    }
    const cards = articleDBtoArticles(articlesdb_snapshot.val());
    // map col to scryfall
    const cards_x_scryfall = cards.map(card => ({
        ...card,
        ...ScryfallDB[card.id in ScryfallDB ? card.id : undefined]
    }));
    console.log(cards_x_scryfall);
    return cards_x_scryfall;
}
export const insertArticle = async ({ folder, card, article }) => {
    // TODO: insert, vertificar si existe y si eso la cantidad se eañade no se establece
    if (false) {

    } else {
        updateArticle({ folder, card, article });
    }
}
// TODO: esto protegido por backend
export const updateArticle = async ({ folder, card, article }) => {
    const { quantity, customprice } = { ...article };
    await set(ref(db, `articles/${folder}/${card.id}/${article.foil ? "F" : "N"}/${article.language}/${article.condition}`), { quantity, customprice });
}

