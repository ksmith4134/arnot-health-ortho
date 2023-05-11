import Image from "next/image"
import skeletonImg from '../../../public/skeleton_1_No Background.png'
import { SKELETON_LOCATIONS, SKELETON_BG, SKELETON_BG_SELECTED, SKELETON_BORDER } from '../Theme'

export default function Skeleton(props) {

    const {
        skeleton,
        theme,
        handleAccordionClick,
        selected
    } = props

    return (
        <>
            <Image src={skeletonImg} alt="skeleton" className='object-contain' />
            { skeleton && 
                skeleton.map(location => (
                    <div 
                        key={location.id}
                        onClick={() => handleAccordionClick(location.id)}
                        className={`
                            w-12 h-12 absolute rounded-full flex justify-center items-center text-xs
                            border-2 hover:animate-customPing hover:cursor-pointer
                            ${selected === location.id 
                                ? `${SKELETON_BG_SELECTED[theme]}`
                                : `${SKELETON_BG[theme]}`
                            }
                            ${SKELETON_BORDER[theme]}
                            ${SKELETON_LOCATIONS[location.label]}
                        `}
                    ></div>
                ))
            }
        </>
    )
}
