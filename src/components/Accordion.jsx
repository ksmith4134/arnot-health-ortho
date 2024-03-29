import Dropdown from '@/components/Dropdown';
import { HOVER_FONT_COLORS } from './Theme'
import Link from 'next/link';

export default function Accordion(props) {
    
    const {
        accordion = {}, 
        theme = 'primary',
        selected, 
        handleClick,
    } = props;

    return (
        <div className='w-full flex-grow'>
            {
                accordion.map((entry, index) => (
                    <Dropdown 
                        key={entry.id}
                        index={index}
                        id={entry.id}
                        label={entry.label}
                        contents={entry.contents}
                        IconOpen={'Plus'}
                        IconClose={'Minus'}
                        theme={theme}
                        selected={selected}
                        handleClick={handleClick}
                    >
                        { entry.id === selected && 
                            <div className='mt-4'>
                                { entry.contents.map((item) => (
                                    <div key={item.id} className=''>
                                        <p className={`text-sm my-2 px-4 py-2 rounded-sm  bg-slate-100 hover:bg-slate-200 ${HOVER_FONT_COLORS[theme]}`}>
                                            { item.link 
                                                ? <Link href={`${item.link}/?index=Background`}>{item.entry}</Link>
                                                : item.entry
                                            }
                                        </p>
                                    </div>
                                ))}
                            </div>
                        }
                    </Dropdown>
                ))
            }
        </div>
    )
}