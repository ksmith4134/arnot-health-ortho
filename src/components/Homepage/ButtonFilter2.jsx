import { BG_COLORS } from '../Theme'

export default function ButtonFilter2(props) {

    const {
        conditionCategories,
        category,
        handleClick
    } = props

    return (
        <div className='w-full'>
            <div className='mt-1 md:mt-0'>
                <div className='flex flex-col space-y-2'>
                    {
                        conditionCategories.map((item) => (
                            <div key={item.id} onClick={() => handleClick(item.id)} className={
                                `text-sm px-8 py-4 rounded hover:cursor-pointer text-center
                                transition ease-in duration-300
                                ${category === item.id 
                                    ? `${BG_COLORS[item.theme]} text-white` 
                                    : 'hover:bg-slate-200 bg-slate-100'}`}
                            >
                                {item.label}
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* <label className='mt-2 text-sm block md:hidden text-center text-slate-400 italic'>Filter</label> */}
        </div>
    )
}
