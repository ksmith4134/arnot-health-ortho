
import Prose from "../markdown/Prose"
import TestimonialsTeam from "../widgets/TestimonialsTeam"


export default function About2(props) {
    const { 
        fullName, 
        biography,
        children
    } = props


    return (
        <div className='pt-36 pb-12'>
            <h2 className='font-bold text-2xl'>About Dr. {fullName}</h2>
            <div className={`mt-8 flex flex-row items-start ${children && 'md:space-x-16'}`}>
                <div className={`${children && 'basis-3/4'}`}>
                    <Prose richText={biography} textSize={'medium'} />
                </div>
                { children }
            </div>
        </div>
    )
}
