import React from 'react'
import { BsFillBookmarksFill } from "react-icons/bs"
import { TfiAngleDown } from "react-icons/tfi"


export default function IndexesMobile(props) {

    const { 
        indexes, 
        selectIndex, 
        selected, 
        openDropdownClick,
        opened
    } = props;

    return (
        <div className='w-full px-8 bg-arnotBlue text-white'>
            <div className={`py-4 hover:cursor-pointer ${opened ? 'border-b-[1px] border-white/40' : ''}`} onClick={openDropdownClick}>
                <div className="flex items-center justify-between">
                    <div className='font-semibold'>{selected}</div>
                    <TfiAngleDown className={`text-white text-lg ${opened ? 'rotate-180' : 'rotate-0'} transition ease-in-out duration-500`} />
                </div>
            </div>
            {
                opened && (
                    <ul className='pt-2 pb-6'>
                        {
                            indexes.map((item) => (
                                <li key={item.id} onClick={() => selectIndex(item.label)} className={`mt-4 text-sm hover:cursor-pointer ${selected === item.label ? 'font-bold' : 'font-light hover:font-bold'}`}>
                                    {item.label}
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}
