import { ICONS } from "../Theme"

export default function TitleBlock(props) {

    const {
        alignBlock = 'center',
        icon = '',
        kicker = [],
        title = '',
        subTitle = ''
    } = props

    const Icon = ICONS[icon]

    return (
        <div className={`flex flex-col ${alignBlock === 'center' ? 'items-center mx-auto text-center' : ''}`}>
            { kicker && 
                <div className='flex items-center space-x-4'>
                    { icon && <Icon className='text-2xl text-arnotPeach' /> }
                    { kicker &&  
                        <div className='flex flex-row space-x-4'>
                            {
                                kicker.map((item, index) => (
                                    <h4 key={index} className='uppercase text-sm last:border-r-0 border-r-[1px] border-gray-400 h-7 flex items-center pr-4'>{item}</h4>
                                ))
                            }
                        </div>
                    }
                </div>
            }
            <h1 className='mt-8 text-5xl font-bold max-w-4xl'>{title}</h1>
            { subTitle && 
                <p className='mt-8 font-light text-lg max-w-xl' dangerouslySetInnerHTML={{__html: subTitle}}></p>
            }
        </div>
    )
}
