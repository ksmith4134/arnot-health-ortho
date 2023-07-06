import { FiPlus, FiMinus } from 'react-icons/fi';
import { BsArrowRightCircle, BsArrowLeftCircle, BsFillStarFill } from 'react-icons/bs'
import { FaStethoscope, FaBookMedical, FaUserCircle, FaAward, FaFilePdf, FaHospitalSymbol } from 'react-icons/fa'
import KneeIcon from '../../public/svg/KneeIcon.svg'
import HipIcon from '../../public/svg/HipIcon.svg'
import ShoulderIcon from '../../public/svg/ShoulderIcon.svg'
import ElbowIcon from '../../public/svg/ElbowIcon.svg'
import FootAnkleIcon from '../../public/svg/FootAnkleIcon.svg'
import HandIcon from '../../public/svg/HandIcon.svg'
import PlayIcon from '../../public/svg/PlayIcon.svg'
import CircleCheck from '../../public/svg/CircleCheck.svg'
import CircleLink from '../../public/svg/CircleLink.svg'
import CircleMap from '../../public/svg/CircleMap.svg'
import CirclePhone from '../../public/svg/CirclePhone.svg'
import CirclePlay from '../../public/svg/CirclePlay.svg'
import CircleStar from '../../public/svg/CircleStar.svg'
import CirclePlus from '../../public/svg/CirclePlus.svg'
import { MdSportsFootball } from 'react-icons/md'
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
import ImageCarousel from './ImageCarousel';

export const CAROUSEL_CONTROLS = {
    margin: {
        normal: 'mt-0',
        large: 'mt-8',
    }
}

export const PROFILE_PIC = {
    size: {
        'small': 'w-16 h-16',
        'medium': 'w-28 h-28',
    }
}

export const SKELETON_LOCATIONS = {
    'Elbow': 'top-[31%] -right-[5%]',
    'Foot / Ankle': 'bottom-[4%] left-[22%]',
    'Hand / Wrist': 'top-[46%] -left-[6%]',
    'Hip': 'top-[46%] left-[56%]',
    'Knee': 'bottom-[25%] right-[23%]',
    'Shoulder': 'top-[15%] left-[11%]',
}

export const SECTION_BG_COLORS = {
    white: 'bg-white',
    gray: 'bg-slate-50',
}

export const SKELETON_BG = {
    primary: 'bg-arnotBlue/20',
    secondary: 'bg-teal-500/30',
}

export const SKELETON_BG_SELECTED = {
    primary: 'bg-arnotBlue/60',
    secondary: 'bg-teal-500/60',
}

export const SKELETON_BORDER = {
    primary: 'border-arnotBlue',
    secondary: 'border-teal-500',
}

export const ICONS = {
    Plus: FiPlus,
    Minus: FiMinus,
    pdf: FaFilePdf,
    play: PlayIcon,
    star: BsFillStarFill,
    award: FaAward,
    profile: FaUserCircle,
    stethoscope: FaStethoscope,
    book: FaBookMedical,
    football: MdSportsFootball,
    hospital: FaHospitalSymbol,
    checkCircle: CircleCheck,
    playCircle: CirclePlay,
    linkCircle: CircleLink,
    plusCircle: CirclePlus,
    telephone: CirclePhone,
    mapCircle: CircleMap,
    starCircle: CircleStar,
    carouselArrowLeft: BsArrowLeftCircle,
    carouselArrowRight: BsArrowRightCircle,
};

export const BODY_ICONS = {
    'elbow': ElbowIcon,
    'foot-ankle': FootAnkleIcon ,
    'hand-wrist': HandIcon,
    'hip': HipIcon,
    'knee': KneeIcon,
    'shoulder': ShoulderIcon,
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
    ImageCarousel: ImageCarousel,
}

export const FONT_COLORS = {
    primary: 'text-arnotBlue',
    secondary: 'text-arnotTeal',
    tertiary: 'text-arnotPeach',
    black: 'text-black',
    blue: 'text-arnotBlue',
    lightBlue: 'text-arnotLightBlue',
    teal: 'text-arnotTeal',
    peach: 'text-arnotPeach',
    yellow: 'text-arnotYellow',
    brown: 'text-arnotBrown',
    darkBrown: 'text-arnotDarkBrown',
    red: 'text-arnotRed',
}

export const BG_COLORS = {
    primary: 'bg-arnotBlue',
    secondary: 'bg-arnotTeal',
    gradient: 'bg-gradient-to-b from-slate-50 to-white',
    gray: 'bg-slate-50',
    white: 'bg-white',
}

export const MENU_BG_COLORS = {
    primary: 'bg-arnotBlue/10',
    secondary: 'bg-arnotTeal/10',
}

export const HOVER_FONT_COLORS = {
    primary: 'hover:text-arnotBlue',
    secondary: 'hover:text-arnotTeal',
}

export const PRIMARY_BUTTON = {
    primary: 'bg-arnotBlue text-white hover:shadow-lg hover:shadow-arnotBlue/20 rounded-sm px-6 py-4',
    secondary: 'bg-slate-100 text-arnotBlue hover:rounded hover:bg-arnotBlue/10 rounded-sm px-6 py-4',
    tertiary: 'hover:text-arnotBlue',
}

export const FONT_SIZE = {
    small: 'text-sm',
    medium: 'text-md',
    large: 'text-lg',
    xLarge: 'text-2xl font-thin',
}