import React, {useState, useEffect} from 'react';

const Paginate = (props) => {
    const {currentPage, postPerPage, totalPosts, paginate, preNextPage} = props;

    // ceil korar karon holo next round figure kora. ex: 3.2 hole 4 hobe.
    const totalPages = Math.ceil(totalPosts / postPerPage)

    const arrOfPageNumber = [];
    const pageNumberLimit = 10; // ex: 11, 12, 13, 14, 15 . 5 ta page link show korbe

    // createing a Arry of pageNumber from totalPage. ex: totalPage 20 ta hole [1, 2, 3, ....20] arokom array hobe
    for(let i = 1; i <= totalPages; i++) {
        arrOfPageNumber.push(i);
    }

    // specefic page number show korar jnno arrOfPageNumber theke nirdishto array create kora.
    let trimStart;
    //if condition use kora hoiyeche jeno trimStart er value negative na hoi.  
    if(currentPage <= 2) {
        trimStart = 0;
    } else {
        trimStart = currentPage - 3; // currentPage theke -3 korar karon holo purboborti 2 ta page number jeno show kore. Ex: jodi ami 7 no page a click kori tahole 5 theke page number show korbe. -3 na korle result hobe => [7, 8, 9, 10, 11]. ar -3 korle result hobe => [5, 6, 7, 8, 9]. akhane currentpage theke -3 na korle user 7 no page a click dewoar por r ager page a jawoar number pabe na, user k previous button use korete hobe, ai problem fix korar jnnoi currentPage theke -3 kora hoiyeche.
    }

    // trimStart er shathe  pageNumberLimit plus korar karon holo jno trimStart er por theke 5 (pageNumberLimit = 5) ta pagenumber pawoa jai. jmn trimStart = 5 hole trimEnd hobe 10. r array theke slice(5, 10) slice korlei in between pageNumber pawoa jabe  
    const trimEnd = trimStart + pageNumberLimit;

    let trimArr;

    // ai condition check korar karon holo, last 5 pagenumber teke jno slice na hoi trimStart o trimEnd er maddhome.
    if(currentPage <= (totalPages - (pageNumberLimit - 1))) {
        trimArr = arrOfPageNumber.slice(trimStart, trimEnd);
    } else {
        trimArr = arrOfPageNumber.slice(totalPages - pageNumberLimit);
    }

    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    return (
        <div style={{marginTop: '2rem'}}>
            {
                currentPage > 3 && <button style={{marginRight: '0.5rem'}} type="button" onClick={() =>paginate(1) }>First</button>
            }
            {trimArr.map(item => {
                return <button key={item} style={{margin: '0.5rem' }} type="button" onClick={() => paginate(item)} >{item}</button>
            })}
{/* 
            {
                hasPreviousPage && <button style={{marginRight: '0.5rem'}} type="button" onClick={() => preNextPage('pre')}>Previous</button>
            }
            {
                hasNextPage && <button type="button" onClick={() => preNextPage('next')}>Next</button>
            } */}
            

            {
                <button style={{marginRight: '0.5rem'}} type="button" onClick={() =>paginate(totalPages) }>Last</button>
            }

            <button disabled={!hasPreviousPage} style={{marginRight: '0.5rem'}} type="button" onClick={() => preNextPage('pre')}>Previous</button>
                        
            <button disabled={!hasNextPage} type="button" onClick={() => preNextPage('next')}>Next</button>
                        
            
        </div>
    )
}

export default Paginate
