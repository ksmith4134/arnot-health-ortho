import Dropdown from '@/components/Dropdown';
import { useState } from 'react'
import { COMPONENTS } from './Theme'

export default function Accordion2(props) {
  
    const {
        id,
        title = null,
        contents = [], // Paragraph, DownloadList, or LinkList
        theme = 'primary',
    } = props;

    const getComponent = (item) => {
        if(typeof COMPONENTS[item.component] !== 'undefined') {
            const Component = COMPONENTS[item.component]
            return <Component {...item} />
        } else {
            return (<div></div>)
        }
    }

    // Returns Paragraph, DownloadList, or LinkList
    // Renders as children of Dropdown
    const layout = contents.map((item) => { 
        return {
            id: item.id,
            components: item.content.map((comp) => {
                return getComponent(comp)
            })
        }
    })

    const [selected, setSelected] = useState(null)

    const handleClick = (id) => {
        id === selected ? setSelected(null) : setSelected(id)
    }

    return (
        <div className='w-full'>
            { title && <h3 className={`mb-6 text-2xl`}>{title}</h3> }
            {
                contents.map((entry) => (
                    <Dropdown 
                        key={entry.id}
                        id={entry.id}
                        label={entry.label}
                        IconOpen={'Plus'}
                        IconClose={'Minus'}
                        selected={selected}
                        handleClick={handleClick}
                    >
                        { 
                            entry.id === selected && 
                                layout.find(item => item.id === entry.id).components.map((component, index) => (
                                    <div key={index}>{component}</div>
                                ))
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