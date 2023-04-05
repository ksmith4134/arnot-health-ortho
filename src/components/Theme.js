import { FiPlus, FiMinus } from 'react-icons/fi';
import { BsFileEarmarkPdf, BsArrowRightCircle, BsArrowLeftCircle, BsLink } from 'react-icons/bs'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { HiOutlinePlayCircle } from 'react-icons/hi2'
import { GiStethoscope } from 'react-icons/gi'
import KneeIcon from '../../public/svg/KneeIcon.svg'
import HipIcon from '../../public/svg/HipIcon.svg'
import ShoulderIcon from '../../public/svg/ShoulderIcon.svg'
import ElbowIcon from '../../public/svg/ElbowIcon.svg'
import FootAnkleIcon from '../../public/svg/FootAnkleIcon.svg'
import HandIcon from '../../public/svg/HandIcon.svg'
import PlayIcon from '../../public/svg/PlayIcon.svg'
import Paragraph from './Paragraph';
import Video from './Video';
import DropdownCard from './DropdownCard';
import InfoBox from './InfoBox';
import Accordion from './Accordion';
import Accordion2 from './Accordion2';
import Download from './Download';
import Resource from './Resource';
import LinkList from './LinkList';
import DownloadList from './DownloadList';
import Dropdown from './Dropdown';
import CarouselWrapper from './CarouselWrapper';

export const SKELETON_LOCATIONS = {
    'Elbow': 'top-[30%] right-[16%]',
    'Foot / Ankle': 'bottom-[0%] left-[34%]',
    'Hand / Wrist': 'top-[45%] left-[3%]',
    'Hip': 'top-[44%] left-[32%]',
    'Knee': 'bottom-[23.3%] right-[34.5%]',
    'Shoulder': 'top-[14%] left-[26%]',
}

export const SKELETON_BG = {
    primary: 'bg-arnotBlue/40',
    secondary: 'bg-teal-500/40',
}

export const SKELETON_BG_SELECTED = {
    primary: 'bg-arnotBlue/80',
    secondary: 'bg-teal-500/80',
}

export const SKELETON_BORDER = {
    primary: 'border-arnotBlue',
    secondary: 'border-teal-500',
}

export const ICONS = {
    Plus: FiPlus,
    Minus: FiMinus,
    pdf: BsFileEarmarkPdf,
    play: PlayIcon,
    stethoscope: GiStethoscope,
    checkCircle: IoIosCheckmarkCircleOutline,
    playCircle: HiOutlinePlayCircle,
    linkCircle: BsLink,
    carouselArrowLeft: BsArrowLeftCircle,
    carouselArrowRight: BsArrowRightCircle,
};

export const BODY_ICONS = {
    'knee': KneeIcon,
    'hip': HipIcon,
    'shoulder': ShoulderIcon,
    'elbow': ElbowIcon,
    'hand-wrist': HandIcon,
    'foot-ankle': FootAnkleIcon 
}

export const COMPONENTS = {
    Paragraph: Paragraph,
    Video: Video,
    DropdownCard: DropdownCard,
    InfoBox: InfoBox,
    Accordion2: Accordion2,
    Download: Download,
    Resource: Resource,
    LinkList: LinkList,
    DownloadList: DownloadList,
    Dropdown: Dropdown,
    CarouselWrapper: CarouselWrapper,
}

export const FONT_COLORS = {
    primary: 'text-arnotBlue',
    secondary: 'text-teal-500',
}

export const BG_COLORS = {
    primary: 'bg-arnotBlue',
    secondary: 'bg-teal-500',
}

export const MENU_BG_COLORS = {
    primary: 'bg-arnotBlue/10',
    secondary: 'bg-teal-500/10',
}

export const HOVER_FONT_COLORS = {
    primary: 'hover:text-arnotBlue',
    secondary: 'hover:text-teal-500',
}