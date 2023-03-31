import Dropdown from '@/components/Dropdown';
import { useState } from 'react'
import { COMPONENTS, HOVER_FONT_COLORS, FONT_COLORS } from './Theme'
import Link from 'next/link';

export default function Accordion2(props) {
  
    const {
        title = '',
        showTitle = true,
        theme = 'primary',
        contents
    } = props;

    const getComponent = (item) => {
        if(typeof COMPONENTS[item.component] !== 'undefined') {
            const Component = COMPONENTS[item.component]
            return <Component {...item} />
        } else {
            return (<div></div>)
        }
    }

    const layout = contents.map((item) => {
        return {
            id: item.id,
            components: item.content.map((comp) => {
                return getComponent(comp)
            })
        }
    }
    )

    const [selected, setSelected] = useState(null)

    const handleClick = (id) => {
        id === selected ? setSelected(null) : setSelected(id)
    }

    return (
        <div className='w-full'>
            <h3 className={`mb-6 text-2xl`}>{title}</h3>
            {
                contents.map((entry) => (
                    <Dropdown 
                        key={entry.id}
                        id={entry.id}
                        label={entry.label}
                        showIcon={entry.showIcon}
                        defaultOpen={entry.defaultOpen}
                        IconOpen={'Plus'}
                        IconClose={'Minus'}
                        selected={selected}
                        handleClick={handleClick}
                    >
                        {   
                            (entry.id === selected || entry.defaultOpen) && 
                                <div className={`${layout.find(item => item.id === entry.id).components.length > 1 && 'grid grid-cols-2'}`}>
                                    { 
                                        layout.find(item => item.id === entry.id).components.map((component, index) => (
                                            <div key={index}>{component}</div>
                                        ))
                                    }
                                </div>
                        }
                    </Dropdown>
                ))
            }
        </div>
    )
}

/* 
    id: uid,
    title: string,
    showTitle: string,
    theme: string,
    contents: [
        {
            component: 'Dropdown',
            id: uid,
            title: string,
            defaultOpen: bool,
            content: [
                {
                    component: 'Paragraph',
                    media: j.media[0] ? j.media.map(img => img.filename) : null,
                    richText: renderRichText(j.text)
                }
                {
                    component: 'Download',
                }
                {
                    component: 'Link',
                }
                {
                    component: 'Nav',
                }
            ]
        }
    ]
*/