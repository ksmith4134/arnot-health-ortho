import { ICONS } from "../Theme"


export default function FiveStars() {

    const Star = ICONS['star']

    return (
        <div className='mt-2 flex flex-row space-x-2'>
            <Star className='text-amber-400' />
            <Star className='text-amber-400' />
            <Star className='text-amber-400' />
            <Star className='text-amber-400' />
            <Star className='text-amber-400' />
        </div>
    )
}
