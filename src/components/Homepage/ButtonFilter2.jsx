import { BG_COLORS } from '../Theme'

export default function ButtonFilter2(props) {

    const {
        conditionCategories,
        category,
        handleClick
    } = props

    return (
        <div className='w-full md:w-[400px] mx-auto mt-12'>
            <label className='text-sm font-semibold block md:hidden'>Filter</label>
            <div className='flex flex-col md:flex-row justify-between'>
                {
                    conditionCategories.map((item) => (
                        <div key={item.id} onClick={() => handleClick(item.id)} className={
                            `text-sm mx-px px-6 py-4 rounded-md hover:cursor-pointer text-center 
                            transition ease-in duration-200
                            ${category === item.id 
                                ? `${BG_COLORS[item.theme]} text-white` 
                                : 'bg-slate-200 hover:bg-slate-300'}`
                        }>
                            {item.label}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
