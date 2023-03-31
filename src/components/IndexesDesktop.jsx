import React from 'react'
import { ImBookmarks } from 'react-icons/im'

export default function Indexes(props) {

    const { indexes, selectIndex, selected } = props;

    return (
        <div>
            <div className='flex items-center space-x-2 mt-1 mb-4 -ml-[1.5px]'>
                <ImBookmarks className='text-xl text-arnotBrown -scale-x-100' />
                <h4 className='font-semibold text-xl text-arnotBrown'>Index</h4>
            </div>
            <ul className='border-l-2 border-arnotBrown/10'>
                {
                    indexes.map((item) => (
                        <li key={item.id} onClick={() => selectIndex(item.label)} 
                            className={`
                                block pl-3 hover:cursor-pointer mt-4 text-sm 
                                ${item.label === selected 
                                    ? 'text-arnotBrown font-bold border-l-2 border-arnotBrown md:-ml-[1.5px] md:pl-[12px] lg:-ml-px lg:pl-[11.5px]' 
                                    : 'text-arnotBrown/90 hover:border-l-2 hover:border-arnotBrown md:hover:-ml-[1.5px] md:hover:pl-[12px] lg:hover:-ml-px lg:hover:pl-[11.5px]'}`}>
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
