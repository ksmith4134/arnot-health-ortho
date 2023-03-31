import { ICONS, HOVER_FONT_COLORS, FONT_COLORS } from './Theme'

export default function Dropdown(props) {

    const { 
        id, 
        label, 
        IconOpen = 'Plus',
        IconClose = 'Minus',
        theme = 'primary',
        selected = null, 
        showIcon = true,
        defaultOpen = false,
        handleClick,
        children
    } = props

    const OpenIcon = ICONS[`${IconOpen}`]
    const CloseIcon = ICONS[`${IconClose}`]

    const opened = id === selected

    return (
        <div className='w-full my-2 pt-2 last:border-b-0 border-b-[1px] border-gray-400'>
            <div className={`flex justify-between items-center hover:cursor-pointer ${HOVER_FONT_COLORS[theme]}`} onClick={() => handleClick(id)}>
                { label &&
                    <h4 className={`${opened && FONT_COLORS[theme]+' font-semibold'} text-md`}>{label}</h4>
                }
                { showIcon
                    ? opened
                        ? <CloseIcon className='text-xl' />
                        : <OpenIcon className='text-xl' />
                    : null
                }
            </div>
            <div className='my-4'>
                {children}
            </div>
        </div>
    )
}