import { CardLanguageToOrder, CardConditionToOrder } from './Collection';

export const sortArticles = (a, b) => {
    return `${CardLanguageToOrder(a.language)}_${a.foil}_${CardConditionToOrder(a.condition)}`
        .localeCompare(`${CardLanguageToOrder(b.language)}_${b.foil}_${CardConditionToOrder(b.condition)}`);
}
const languages = ["EN", "DE", "FR", "ES", "IT", "CN", "JP", "PT", "RU", "PX"];
export const nextLanguage = (lang) => {
    const index = languages.indexOf(lang) + 1;
    if (index > languages.length - 1) {
        return languages[0];
    }
    return languages[index];
}

const conditions = ["MT", "NM", "EX", "GD", "LP", "PL", "PO"];
export const nextCondition = (condition) => {
    const index = conditions.indexOf(condition) + 1;
    if (index > conditions.length - 1) {
        return conditions[0];
    }
    return conditions[index];
}