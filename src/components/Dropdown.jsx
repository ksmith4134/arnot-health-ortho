import { ICONS, HOVER_FONT_COLORS, FONT_COLORS, FONT_SIZE } from './Theme'

export default function Dropdown(props) {

    const { 
        id, 
        label, 
        fontSize = 'medium',
        IconOpen = 'Plus',
        IconClose = 'Minus',
        theme = 'primary',
        selected = null,
        handleClick,
        children
    } = props

    const OpenIcon = ICONS[`${IconOpen}`]
    const CloseIcon = ICONS[`${IconClose}`]

    const opened = id === selected

    return (
        <div className={`w-full py-5 last:border-b-0 border-b-[1px] border-gray-400`}>
            <div className={`flex justify-between space-x-4 items-center hover:cursor-pointer ${HOVER_FONT_COLORS[theme]}`} onClick={() => handleClick(id)}>
                { label &&
                    <h4 className={`${opened && FONT_COLORS[theme]} ${FONT_SIZE[fontSize]}`}>{label}</h4>
                }
                { opened
                    ? <CloseIcon className={`text-xl flex-none ${FONT_COLORS[theme]}`} />
                    : <OpenIcon className={`text-xl flex-none`} />
                }
            </div>
            { 
                children 
            }
        </div>
    )
}