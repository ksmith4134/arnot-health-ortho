import Image from 'next/image'
import { BODY_ICONS } from './Theme'


export default function ConditionHeader(props) {

    const { 
        bodyPart, 
        label = 'Background', 
        title = 'Treatment', 
        description 
    } = props

    const bodyPartIcon = BODY_ICONS[`${bodyPart}`]

    return (
        <div className='-mb-4'>
            <h1 className='text-4xl font-bold'>{title}</h1>
            <h3 className='mt-2 text-lg font-light'>{description}</h3>
            <div className='mt-12 flex justify-center items-center space-x-6'>
                <div className='flex-none inline-flex items-center space-x-3'>
                    { bodyPartIcon && 
                        <Image src={bodyPartIcon} alt='body part icon' className='w-14 aspect-square' />
                    }
                    <div className='text-arnotBlue font-bold uppercase'>{label}</div>
                </div>
                <hr className='bg-arnotBlue h-[0.5px] w-full border-none flex-initial'></hr>
            </div>
        </div>
    )
}
