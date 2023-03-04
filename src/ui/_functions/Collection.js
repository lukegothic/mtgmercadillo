export const CardColorToOrder = (c) => {
    var colors = c.colors ? c.colors : c.card_faces[0].colors;
    // ARTIFACT // LANDS
    if (colors.length === 0) {
        if (c.type_line.indexOf("Land") !== -1) {
            return "h";
        } else {
            return "g";
        }
    // MULTI      
    } else if (colors.length > 1) {
        return "f";
    // PLANAS
    } else {
        switch(colors[0]) {
            case 'W':
                return "a";
            case 'U':
                return "b";
            case 'B':
                return "c";
            case 'R':
                return "d";
            case 'G':
                return "e";
        }
    }
}
export const CardRarityToOrder = (c) => {
    switch(c.rarity) {
        case 'common':
            return "d";
        case 'uncommon':
            return "c";
        case 'rare':
            return "b";
        case 'mythic':
            return "a";
        case 'special':
            return "e";
    }
}

export const LangIdToString = (langid) => {
    switch(langid) {
        case 1:
        return "ENG";
        case 2:
        return "FRE";
        case 3:
        return "GER";
        case 4:
        return "ESP";
        case 5:
        return "ITA";
        case 6:
        return "CHN";
        case 7:
        return "JPN";
        case 8:
        return "POR";
        case 9:
        return "RUS";
    }
};

export const CardConditionToOrder = (condition) => {
    switch(condition) {
        case "MT":
            return "a";
        case "NM":
            return "b";
        case "EX":
            return "c";
        case "GD":
            return "d";
        case "LP":
            return "e";
        case "PL":
            return "f";
        case "PO":
            return "g";
    }
}

export const CardLanguageToOrder = (language) => {
    switch(language) {
        case "EN":
        return "a";
        case "FR":
        return "b";
        case "DE":
        return "c";
        case "ES":
        return "d";
        case "IT":
        return "e";
        case "CN":
        return "f";
        case "JP":
        return "g";
        case "PT":
        return "h";
        case "RU":
        return "i";
        case "PX":
        return "j";
        default:
        return 999;
    }
};
// set + color + rareza
const sortFieldInventario = (card) => `${card.released_at}_${card.set}_${card.collector_number ? card.collector_number.padStart(3, "0") : "000"}`;
// color + set + nombre
const sortFieldVenta = (card) => `${CardColorToOrder(card)}_${card.name}_${card.released_at}`;
// edhrec rank
const sortFieldEDH = (card) => `${(card.edhrec_rank)}`.padStart(6, "0");

export const sortInventoryMode = ((a, b) => sortFieldInventario(a).localeCompare(sortFieldInventario(b)));
export const sortVentaMode = ((a, b) => sortFieldVenta(a).localeCompare(sortFieldVenta(b)));

export const sortCollection = (collection, sortType) => {
    let sortFieldFn = null;
    switch(sortType) {
        case "i":
        case "inventario":
            sortFieldFn = sortFieldInventario;
        break;
        case "v":
        case "venta":
            sortFieldFn = sortFieldVenta;
        break;
        case "e":
        case "edh":
            sortFieldFn = sortFieldEDH;
        break;
    }
    let sortFieldById = {};
    collection.forEach(card => sortFieldById[card.id] = sortFieldFn(card));
    collection.sort((a,b) => sortFieldById[a.id].localeCompare(sortFieldById[b.id]));
    return collection;
}
// TODO: revisar con el cambio de ddbb)
export const groupCollection = (collection, groupType) => {
    // inventario => agrupar por idProduct (tambien podria agrupar por id de scryfall)
    // venta => agrupar por oracle_id
    var collectionDict = {};
    switch(groupType) {
        case "i":
        case "inventario":
            collection.forEach(card => {
                if (!(card.extendedInfo.id in collectionDict)) {
                    collectionDict[card.extendedInfo.id] = [];
                }
                collectionDict[card.extendedInfo.id].push(card);
            });
            break;
        case "v":
        case "venta":
            collection.forEach(card => {
                if (!(card.extendedInfo.oracle_id in collectionDict)) {
                    collectionDict[card.extendedInfo.oracle_id] = [];
                }
                collectionDict[card.extendedInfo.oracle_id].push(card);
            });
            break;
    }
    var collectionGrouped = [];
    for (var key in collectionDict) {
        collectionGrouped.push([collectionDict[key]]);
    }
    return collectionGrouped;
}
export const removeOrdersFromCollection = (collection, orders) => {
    if (orders) {
        const articlesInOrders = 
            Object.entries(orders)
                .map(order => order[1].articles)
                .reduce((all, item) => all.concat(item), [])
                .reduce((all, item) => {
                    item.idArticle in all ? (all[item.idArticle] += item.quantity) : (all[item.idArticle] = item.quantity);
                    return all;
                }, {});
        collection.forEach(card => card.Amount -= (card.idArticle in articlesInOrders ? articlesInOrders[card.idArticle] : 0));
        return collection.filter(card => card.Amount > 0);
    } else {
        return collection;
    }
}