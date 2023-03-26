import React from 'react'
import { FaBookmark } from "react-icons/fa"

export default function Indexes(props) {

    const { indexes, handleClick, selected } = props;

    return (
        <>
            <div className="flex items-center space-x-2 mt-1 mb-4 -ml-[1.5px]">
                <FaBookmark className="text-lg text-arnotPeach" />
                <h4 className="font-semibold text-xl text-arnotPeach/90">Index</h4>
            </div>
            <ul className="border-l-2">
                {
                    indexes.map((item) => (
                        <li key={item.id} onClick={() => handleClick(item.label)} className={`block pl-3 -ml-[1.25px] hover:cursor-pointer mt-4 text-sm ${item.label === selected ? 'text-arnotBlue font-semibold border-l-2 border-arnotBlue' : 'font-light hover:font-normal'}`}>
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
