import { faArrowRightArrowLeft, faMoneyBillTrendUp, faInbox, faVault, faWandMagicSparkles, faBoxArchive } from '@fortawesome/free-solid-svg-icons'

export default [{
    id: "trade",
    description: "Cartas a la venta tanto en mano como en cardmarket",   // TODO: ver si hace falta hacer otro folder 'album' para las carats en album (album si/no)
    icon: faArrowRightArrowLeft
},{
    id: "specs",
    description: "Cartas guardadas esperando a que suban de precio",
    icon: faMoneyBillTrendUp
},{
    id: "decks",
    description: "Cartas en barajas",                                    // TODO: ver si hace falta crear multioples barajas o alguna caracteristica mas (deckid)
    icon: faBoxArchive
},{
    id: "wants",
    description: "Cartas que busco",
    icon: faWandMagicSparkles
},{
    id: "pool",
    description: "Cartas disponibles para hacer barajas",
    icon: faInbox
},{
    id: "locked",
    description: "Cartas a buen recaudo",
    icon: faVault
}];