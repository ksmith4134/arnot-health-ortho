import { useState } from 'react'
import { TfiAngleDown } from 'react-icons/tfi'

export default function DropdownCard(props) {

    const {
        defaultOpen = false,
        title,
        richText
    } = props

    const [ opened, setOpened ] = useState(defaultOpen)

    const handleClick = () => {
        setOpened(!opened)
    }

    return (
        <div className='rounded-md bg-arnotBlue/10 px-8 border-[1px] border-arnotBlue/10 hover:border-[1px] hover:border-arnotBlue/50 hover:cursor-pointer' onClick={handleClick}>
            <div className={`flex items-center justify-between ${opened ? 'border-b-[1px] border-arnotBlue/50' : ''} py-6`}>
                <h2 className='text-lg font-semibold'>{title}</h2>
                <TfiAngleDown className={`text-lg ${opened ? '-rotate-180' : 'rotate-0'} transition ease-in-out duration-500`} />
            </div>
            {
                opened && 
                <article className="prose max-w-none prose-sm py-4" dangerouslySetInnerHTML={{__html:richText}}></article>
            }
        </div>
    )
}
