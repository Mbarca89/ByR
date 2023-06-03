import React from "react";
import style from './Properties.module.css'

const Pagination = ({totalCards,currentPage,nextPage,prevPage,firstPage,lastPage}) => {
    
    const cardsPerPage = 6
    let pages = []
    for(let i = 1; i<=Math.ceil(totalCards / cardsPerPage);i++){
        pages.push(i)
    }
    return (
        <div className={style.pagination}>
            <button className={style.arrow} onClick={firstPage}>{'<<'}</button>
            <button className={style.button} onClick={prevPage}>{'<'}</button>
            <button className={style.current}>{`${currentPage}/${Math.ceil(totalCards / cardsPerPage)}`}</button>
            <button className={style.button} onClick={nextPage}>{'>'}</button>
            <button className={style.arrow} onClick={lastPage}>{'>>'}</button>            
        </div>
    )
}

export default Pagination