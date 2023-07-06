import { ICONS, FONT_COLORS, FONT_SIZE } from "../Theme"

export default function TitleBlock(props) {

    const {
        alignBlock = 'center',
        icon = '',
        iconColor = 'primary',
        kicker = null,
        title = '',
        subTitle = '',
        subTitleSize = 'large',
    } = props

    const Icon = ICONS[icon]

    return (
        <header className={`flex flex-col ${alignBlock === 'center' ? 'items-center mx-auto text-center' : ''}`}>
            { kicker && 
                <div className={`flex items-center gap-3 ${FONT_COLORS[iconColor]}`}>
                    { icon && <Icon className={`text-2xl`} /> }
                    { kicker &&  
                        <div className='flex flex-row gap-6'>
                            {
                                kicker.map((item, index) => (
                                    <h4 key={index} className='text-sm uppercase font-semibold last:border-r-0 border-r-[1px] border-slate-300 h-7 flex items-center pr-6'>{item}</h4>
                                ))
                            }
                        </div>
                    }
                </div>
            }
            { title && 
                <h1 className={`${kicker && 'mt-6'} text-4xl sm:text-5xl font-bold max-w-4xl leading-[48px] sm:leading-[56px]`}>{title}</h1>
            }
            { subTitle && 
                <p className={`mt-6 sm:font-normal ${FONT_SIZE[subTitleSize]} max-w-xl text-gray-600`} dangerouslySetInnerHTML={{__html: subTitle}}></p>
            }
        </header>
    )
}
