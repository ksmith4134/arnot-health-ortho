import FiveStars from "../Shared/FiveStars"
import IconImage from "../Shared/IconImage"

export default function TestimonialsContent(props) {

    const {
        title,
        body,
        bodyPart,
        name,
        city,
        state,
        displayBodyIcon = false,
    } = props

    return (
        <div>
            { title && <div className='font-bold text-lg'>{ title }</div> }
            <FiveStars />
            <div className='mt-6 line-clamp-[8]'>{ body }</div>
            <div className='first:mt-0 mt-8 flex flex-row items-center'>
                <div className={`${displayBodyIcon === true ? 'block pr-4' : 'hidden md:block md:pr-4'}`}>
                    <IconImage icon={bodyPart} type={'body'} size={'w-16 h-16'} />
                </div>
                <div>
                    <p className='font-bold'>{ name }</p>
                    <p className='text-md'>{ city }, { state }</p>
                </div>
            </div>
        </div>
    )
}
