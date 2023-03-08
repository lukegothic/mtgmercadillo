import { useRef } from "react";
import Card from "./Card";
import CardInventory from "./CardInventory";

const AlbumFake = ({ collection }) => {
  const header = useRef();
  return (<>
    <button style={{position:"fixed", top: 100, right: 0, zIndex: 100}} onClick={() => header.current.scrollIntoView()}>Search</button>
    <h3 ref={header}>Available to add</h3>
    <div className={`album album-fake`}>
      { collection
          .map((card, i) => <Card key={i} card={card}><CardInventory card={card} /></Card>) }
      </div>
  </>)
}

export default AlbumFake;