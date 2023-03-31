import Dropdown from '@/components/Dropdown';
import { useState } from 'react'
import { HOVER_FONT_COLORS, FONT_COLORS } from './Theme'
import Link from 'next/link';

export default function Accordion(props) {
    
    const {
        accordion = {}, 
        title = '',
        theme = 'primary',
    } = props;

    const [selected, setSelected] = useState(null)

    const handleClick = (id) => {
        id === selected ? setSelected(null) : setSelected(id)
    }

    // const opened = id === selected

    return (
        <div className='max-w-xs'>
            {title && <h3 className={`mb-6 ${FONT_COLORS[theme]} font-bold text-md`}>{title.toUpperCase()}</h3> }
            {
                accordion.map((entry) => (
                    <Dropdown 
                        key={entry.id}
                        id={entry.id}
                        label={entry.label}
                        contents={entry.contents}
                        IconOpen={'Plus'}
                        IconClose={'Minus'}
                        theme={theme}
                        selected={selected}
                        handleClick={handleClick}
                    >
                        {
                            entry.id === selected && entry.contents.map((item) => (
                                <div key={item.id} className='my-1'>
                                    <p className={`text-md ${HOVER_FONT_COLORS[theme]}`}>
                                        {item.link ? (<Link href={`${item.link}/?index=Background`}>{item.entry}</Link>) : item.entry}
                                    </p>
                                </div>
                            ))
                        }
                    </Dropdown>
                ))
            }
        </div>
    )
}