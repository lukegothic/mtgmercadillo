import { faArrowLeft, faArrowRight, faListDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clamp } from '_functions/math';
const N_PAGEOFFSET = 3;
const AlbumPaginator = ({ listSize, itemsPerPage, page, setPage }) => {
    // TODO: intelligent pagination
    const pagesCount = Math.ceil(listSize / itemsPerPage);
    const pageNum = Math.min(pagesCount, N_PAGEOFFSET * 2 + 1);
    const startPage = clamp(page - N_PAGEOFFSET, 1, pagesCount - pageNum + 1);
    const pages = Array.from({ length: pageNum }, (_, i) => i + startPage);
    return (<> 
        {pagesCount > 1 && <div className="album-paginator">
            <div className={`album-paginator-page ${page === 1 ? "disabled":""}`} onClick={() => page > 1 && setPage(page - 1)}>
                <FontAwesomeIcon size="sm" icon={faArrowLeft} />
            </div>
            {pages.map(pageN => <div className={`album-paginator-page ${page === pageN ? "active" : ""}`} key={`page_${pageN}`} onClick={() => page !== pageN && setPage(pageN)}>{pageN}</div>)}
            <div className={`album-paginator-page ${page  * itemsPerPage > listSize ? "disabled":""}`} onClick={() => page * itemsPerPage < listSize && setPage(page + 1)}>
                <FontAwesomeIcon size="sm" icon={faArrowRight} />
            </div>
        </div>
    }
    </>);
}

export default AlbumPaginator;