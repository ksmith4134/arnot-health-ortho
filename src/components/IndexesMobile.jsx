import React from 'react'
import { BsFillBookmarksFill } from 'react-icons/bs'
import { TfiAngleDown } from 'react-icons/tfi'


export default function IndexesMobile(props) {

    const { 
        indexes, 
        selectIndex, 
        selected,
        title,
        openDropdownClick,
        opened
    } = props;

    return (
        <div className='w-full bg-arnotBlue text-white'>
            <div className={`relative z-20 px-8 py-4 hover:cursor-pointer `} onClick={openDropdownClick}>
                <div className='text-xs font-light'>{title}</div>
                <div className='flex items-center justify-between'>
                    <div className='font-semibold'>{selected}</div>
                    <TfiAngleDown className={`text-white text-lg ${opened ? '-rotate-180' : 'rotate-0'} transition ease-in-out duration-500`} />
                </div>
            </div>
            {
                opened && (
                    <ul className='px-8 pb-4 pt-20 absolute top-0 z-10 divide-y divide-white/40 bg-arnotBlue w-full'>
                        {
                            indexes.map((item) => (
                                <li key={item.id} onClick={() => selectIndex(item.label)} className={`py-4 text-sm hover:cursor-pointer ${selected === item.label ? 'font-bold' : 'font-light hover:font-bold'}`}>
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
