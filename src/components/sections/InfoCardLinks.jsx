import Link from "next/link"
import IconImage from "../Shared/IconImage"
import { RxArrowRight } from 'react-icons/rx'
import { FONT_COLORS } from "../Theme"

export default function InfoCardLinks(props) {

    const {
        cards,
    } = props

    return (
        <div className='border border-slate-100'>
            <div className='max-w-6xl md:px-8 mx-auto grid grid-cols-1 md:grid-cols-3'>
                { cards.map((item) => (
                    <Link key={item.id} href={item.url} className='p-8 md:p-12 flex flex-col justify-center hover:bg-slate-50 group'>
                        <div className='flex items-center space-x-2'>
                            <IconImage icon={item.icon} alt='icon' className='w-8'/>
                            <h4 className={`font-semibold ${FONT_COLORS[item.titleColor]}`}>{item.title}</h4>
                        </div>
                        <p className='mt-4 text-sm'>{item.body}</p>
                        <button className={`mt-4 text-sm inline-flex items-center group-hover:text-arnotBlue`}>
                            <div>{item.buttonLabel}</div>
                            <RxArrowRight className={`text-lg ml-2 group-hover:translate-x-1 transition ease-in-out duration-300`} />
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    )
}
