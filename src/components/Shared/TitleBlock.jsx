import { ICONS } from "../Theme"

export default function TitleBlock(props) {

    const {
        alignBlock = 'center',
        fancy = false,
        fancyIcon = '',
        icon = '',
        kicker = [],
        title = '',
        subTitle = ''
    } = props

    const Icon = ICONS[icon]
    const FancyIcon = ICONS[fancyIcon]

    return (
        <header className={`flex flex-col ${alignBlock === 'center' ? 'items-center mx-auto text-center' : ''}`}>
            { kicker && 
                <div className='flex items-center space-x-4'>
                    { icon && <Icon className='text-2xl text-arnotBlue' /> }
                    { kicker &&  
                        <div className='flex flex-row space-x-6 text-arnotBlue'>
                            {
                                kicker.map((item, index) => (
                                    <h4 key={index} className='text-sm uppercase font-semibold last:border-r-0 border-r-[1px] border-arnotBlue h-7 flex items-center pr-6'>{item}</h4>
                                ))
                            }
                        </div>
                    }
                </div>
            }
            <h1 className='mt-8 text-4xl sm:text-5xl font-bold max-w-4xl leading-[48px] sm:leading-[56px]'>{title}</h1>
            { subTitle && 
                <p className='mt-8 sm:font-normal text-lg max-w-xl text-gray-600' dangerouslySetInnerHTML={{__html: subTitle}}></p>
            }
            { subTitle && fancy && 
                <div className={`flex justify-center items-center ${fancyIcon ? 'mt-8 space-x-2' : 'mt-8'}`}>
                    <hr className='bg-arnotBlue w-8 h-[2px] border-none flex-initial'></hr>
                    { fancyIcon && <FancyIcon className='text-arnotBlue w-6 h-6' /> }
                    <hr className='bg-arnotBlue w-8 h-[2px] border-none flex-initial'></hr>
                </div>
            }
        </header>
    )
}
