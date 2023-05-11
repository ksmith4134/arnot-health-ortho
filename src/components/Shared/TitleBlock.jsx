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
        <div className={`flex flex-col ${alignBlock === 'center' ? 'items-center mx-auto text-center' : ''}`}>
            { kicker && 
                <div className='flex items-center space-x-4'>
                    { icon && <Icon className='text-2xl text-arnotPeach' /> }
                    { kicker &&  
                        <div className='flex flex-row space-x-4'>
                            {
                                kicker.map((item, index) => (
                                    <h4 key={index} className='uppercase text-md last:border-r-0 border-r-[1px] border-gray-400 h-7 flex items-center pr-4'>{item}</h4>
                                ))
                            }
                        </div>
                    }
                </div>
            }
            <h1 className='mt-8 text-4xl sm:text-5xl font-bold max-w-4xl leading-[48px] sm:leading-[56px]'>{title}</h1>
            { subTitle && 
                <p className='mt-8 sm:font-light text-xl max-w-xl' dangerouslySetInnerHTML={{__html: subTitle}}></p>
            }
            { subTitle && fancy && 
                <div className={`flex justify-center items-center ${fancyIcon ? 'mt-8 space-x-2' : 'mt-8'}`}>
                    <hr className='bg-arnotBlue w-8 h-[2px] border-none flex-initial'></hr>
                    { fancyIcon && <FancyIcon className='text-arnotBlue w-6 h-6' /> }
                    <hr className='bg-arnotBlue w-8 h-[2px] border-none flex-initial'></hr>
                </div>
            }
        </div>
    )
}
