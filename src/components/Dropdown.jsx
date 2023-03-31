import { ICONS, HOVER_FONT_COLORS, FONT_COLORS } from './Theme'

export default function Dropdown(props) {

    const { 
        id, 
        label, 
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
        <div className='w-full my-4 py-2 first:pt-0 first:mt-0 last:border-b-0 border-b-[1px] border-gray-400'>
            <div className={`flex justify-between space-x-4 items-center hover:cursor-pointer ${HOVER_FONT_COLORS[theme]}`} onClick={() => handleClick(id)}>
                { label &&
                    <h4 className={`${opened && FONT_COLORS[theme]+' font-bold'} text-md`}>{label}</h4>
                }
                { opened
                    ? <CloseIcon className='text-xl' />
                    : <OpenIcon className='text-xl' />
                }
            </div>
            <div className='my-4'>
                {children}
            </div>
        </div>
    )
}