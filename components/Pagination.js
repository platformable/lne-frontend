import React from 'react'

export default function Pagination({postsPerPage,TotalPosts, paginate}) {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(TotalPosts/postsPerPage); i++) {

        pageNumbers.push(i)

    }

    return (
        <div>
            <nav className="">
            <ul className="flex gap-x-1">
                
                {pageNumbers.map((number,index)=>{
                    return(
                    <>

                    <li key={number} className="bg-white px-2">
                        <a className="cursor-pointer text-xxs" onClick={()=> paginate(number)}>{number}</a>
                    </li>
                    </>)
                })}
            </ul>
            </nav>
        </div>
    )
}
