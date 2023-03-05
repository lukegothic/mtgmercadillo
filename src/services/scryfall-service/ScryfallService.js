const UndefinedDatabaseEntry = {
    "oracle_id":"00000000-0000-0000-0000-000000000000",
    "name":"Updating data...",
    "released_at":"3000-12-12",
    "image_uris": { "small": "https://cards.scryfall.io/small/front/6/1/616a3755-f08c-4b8f-954b-7e3f3a8fa71f.jpg?1583965480"},
    "mana_cost":"{4}{W}{W}",
    "cmc":20,
    "type_line":"Sorcery",
    "colors":[""],
    "color_identity":[""],
    "reserved":false,
    "reprint":false,
    "set":"mh2",
    "set_name":"Updating set",
    "collector_number":"999",
    "digital":false,
    "rarity":"mythic",
    "frame":"2003",
    "edhrec_rank":99999,
    "prices": { "eur": 999.99, "eur_foil": 999.99 }
}
export const getCompactScryfallDatabase = async () => {
    console.log("requesting scryfall db");
    const scryfall_data = await fetch("data/scryfall_compact.json");
    const scryfall_json = await scryfall_data.json();
    scryfall_json[undefined] = UndefinedDatabaseEntry;
    return scryfall_json;
}

export const searchScryfall = async (term) => {
    let r = await fetch(`https://api.scryfall.com/cards/search?order=released&dir=asc&q=${term}&unique=prints&order=released`);
    if (r.status !== 404) {
        let json = await r.json();
        let results = json.data;
        while (json.has_more) {
            r = await fetch(json.next_page);
            json = await r.json();
            results = results.concat(json.data);
        }
        return results.filter(c => !c.digital);
    } else {
        return [];
    }
}

export const getSets = async () => {
    const r = await fetch(`https://api.scryfall.com/sets`);
    const scryfall_sets = await r.json();
    return scryfall_sets.data.filter(c => !c.digital).sort((s1, s2) => new Date(s1.released_at) - new Date(s2.released_at));
}