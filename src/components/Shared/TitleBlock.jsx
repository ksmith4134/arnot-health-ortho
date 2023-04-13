import { ICONS } from "../Theme"

export default function TitleBlock(props) {

    const {
        alignBlock = 'center',
        icon = 'stethoscope',
        kicker = 'It\'s what we do',
        title = '',
        subTitle = ''
    } = props

    const Icon = ICONS[icon]

    return (
        <div className='flex flex-col items-center max-w-xl mx-auto text-center'>
            { icon && kicker && 
                <div className='flex items-center space-x-2'>
                    <Icon className='text-2xl text-arnotPeach' />
                    <h4 className='uppercase text-sm'>{kicker}</h4>
                </div>
            }
            { kicker && !icon && 
                <h4 className='uppercase text-sm'>{kicker}</h4>
            }
            <h1 className='mt-6 text-4xl font-bold'>{title}</h1>
            <p className='mt-6 font-light text-lg' dangerouslySetInnerHTML={{__html: subTitle}}></p>
        </div>
    )
}
