import React from 'react'
import { BsFillBookmarksFill } from 'react-icons/bs'

export default function Indexes(props) {

    const { indexes, selectIndex, selected } = props;

    return (
        <>
            <div className='flex items-center space-x-2 mt-1 mb-4 -ml-[1.5px]'>
                {/* <BsFillBookmarksFill className='text-xl text-arnotPeach' /> */}
                <h4 className='font-semibold text-xl text-arnotPeach/90'>Index</h4>
            </div>
            <ul className='border-l-2'>
                {
                    indexes.map((item) => (
                        <li key={item.id} onClick={() => selectIndex(item.label)} 
                            className={`
                                block pl-3 hover:cursor-pointer mt-4 text-sm 
                                ${item.label === selected 
                                    ? 'text-arnotBlue font-bold border-l-2 border-arnotBlue md:-ml-[1.5px] md:pl-[12px] lg:-ml-px lg:pl-[11.5px]' 
                                    : 'text-gray-600 hover:text-black hover:border-l-2 hover:border-gray-400 md:hover:-ml-[1.5px] md:hover:pl-[12px] lg:hover:-ml-px lg:hover:pl-[11.5px]'}`}>
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
