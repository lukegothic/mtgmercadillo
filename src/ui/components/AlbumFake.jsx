import Card from "./Card";
import CardInventory from "./CardInventory";

const AlbumFake = ({ collection }) => {
  return (<>
    <h3>Available to add</h3>
    <div className={`album album-fake`}>
      { collection
          .map((card, i) => <Card key={i} card={card}><CardInventory card={card} /></Card>) }
      </div>
  </>)
}

export default AlbumFake;