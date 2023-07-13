import Prose from "../markdown/Prose"


export default function About(props) {
    const { 
        fullName, 
        biography,
        children
    } = props

    return (
        <div className=''>
            <h2 className='font-bold text-2xl'>About Dr. {fullName}</h2>
            <div className={`mt-8 flex flex-col md:flex-row items-start ${children && 'md:space-x-16'}`}>
                <div className={`${children && 'md:basis-3/4'}`}>
                    <Prose richText={biography} textSize={'medium'} />
                </div>
                { children && 
                    <div className='mt-16 md:mt-0 w-full md:w-fit'>
                        { children }
                    </div>
                }
            </div>
        </div>
    )
}
