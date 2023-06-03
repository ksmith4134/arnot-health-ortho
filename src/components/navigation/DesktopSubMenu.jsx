import { useNavContext } from '../NavProvider';
import { useState, forwardRef } from 'react';
import { ICONS } from '../Theme';
import { RxCaretDown } from 'react-icons/rx';
import Link from 'next/link';

const DesktopSubMenu = forwardRef(function DesktopSubMenu(props, ref) {

    const { subMenu, closeMenu } = props
    // subMenu: slug, title, linkLabel, linkUrl, linkIcon, target

    const { navDropdown } = useNavContext()
    const [ opened, setOpened ] = useState(null)

    const handleClick = (id) => {
        id === opened ? setOpened(null) : setOpened(id)
    }

    const Icon = subMenu.linkIcon ? ICONS[subMenu.linkIcon] : null


    return (
        <div ref={ref} className='absolute top-8 z-10 w-[340px] bg-white border rounded shadow-md'>
            {/* SubMenu Header */}
            <div className='flex flex-row justify-between items-center p-4'>
                <div className='basis-7/12 text-arnotPeach font-semibold'>{subMenu.title}</div>
                <div className='flex flex-row justify-center items-center text-center space-x-2 text-arnotBlue'>
                    { subMenu.linkIcon && <Icon /> }
                    <Link href={subMenu.linkUrl} target={subMenu.target} className='text-sm underline underline-offset-4' onClick={() => closeMenu(null)}>{subMenu.linkLabel}</Link>
                </div>
            </div>

            {/* Body Part Dropdowns */}
            { navDropdown.map(item => (
                <div 
                    key={item.id} 
                    className={`
                        border-t text-sm hover:cursor-pointer bg-slate-50 
                        ${item.id !== opened && 'hover:bg-slate-200'} 
                    `} 
                    onClick={() => handleClick(item.id)}
                >
                    <div className={`flex justify-between items-center p-4 ${item.id === opened && 'bg-arnotBlue text-white shadow-md shadow-arnotBlue/30'}`}>
                        <div>{item.bodyPart}</div>
                        <RxCaretDown className={`text-xl ${item.id === opened && 'rotate-180'} transition ease-in-out duration-200`} />
                    </div>
                    {/* Condition Links */}
                    <div className={`bg-arnotBlue/10 ${item.id === opened && 'px-4 py-2'}`}>
                        { opened === item.id && 
                            item.conditions.map(link => (
                                <Link key={link.id} href={`/${item.slug}/${link.slug}${subMenu.slug}`} onClick={() => closeMenu(null)}>
                                    <p className='py-2 text-arnotBlue hover:underline hover:underline-offset-8'>{link.condition}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            ))}
            
        </div>
    )
})

export default DesktopSubMenu;
