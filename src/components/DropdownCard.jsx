import { useState } from 'react'
import { TfiAngleDown } from 'react-icons/tfi'
import Prose from './markdown/Prose'
import { ICONS } from './Theme'

export default function DropdownCard(props) {

    const {
        id,
        defaultOpen = false,
        title,
        richText
    } = props

    const [ opened, setOpened ] = useState(defaultOpen)

    const handleClick = () => {
        setOpened(!opened)
    }

    const Plus = ICONS['Plus']
    const Minus = ICONS['Minus']

    return (
        <div className='rounded-md bg-arnotBlue/10 px-8 border-[1px] border-arnotBlue/10 hover:border-[1px] hover:border-arnotBlue/40 hover:cursor-pointer group' onClick={handleClick}>
            <div className={`flex items-center justify-between ${opened ? 'border-b-[1px] border-arnotBlue/50' : ''} py-6`}>
                <h2 className='text-lg font-semibold group-hover:text-arnotBlue'>{title}</h2>
                {
                    opened
                    ?   <Minus className='text-xl group-hover:text-arnotBlue' />
                    :   <Plus className='text-xl group-hover:text-arnotBlue' />
                }
            </div>
            {
                opened && 
                <div className='py-4'>
                    <Prose richText={richText} />
                </div>
            }
        </div>
    )
}
