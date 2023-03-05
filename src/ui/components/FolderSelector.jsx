import { useContext } from "react";
import FolderContext from "ui/_functions/contexts/FolderContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Folders from '../_functions/Folders';
import './FolderSelector.css';

const FolderSelector = () => {
    const { folder, setFolder } = useContext(FolderContext);
    return <div className="folder-selector">
        {Folders.map(f => <div className={`folder ${f.id===folder ? "selected": ""}`} key={f.id} title={f.description} onClick={() => f.id !== folder && setFolder(f.id)}>
                <FontAwesomeIcon icon={f.icon} /> {f.id}
            </div>
        )}
    </div>;
}

export default FolderSelector;