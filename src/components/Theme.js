import { FiPlus, FiMinus } from 'react-icons/fi';
import { BsFileEarmarkPdf, BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs'
import { GiStethoscope } from 'react-icons/gi'
import KneeIcon from '../../public/svg/KneeIcon.svg'
import HipIcon from '../../public/svg/HipIcon.svg'
import ShoulderIcon from '../../public/svg/ShoulderIcon.svg'
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

export const ICONS = {
    Plus: FiPlus,
    Minus: FiMinus,
    pdf: BsFileEarmarkPdf,
    play: PlayIcon,
    stethoscope: GiStethoscope,
    carouselArrowLeft: BsArrowLeftCircle,
    carouselArrowRight: BsArrowRightCircle,
    knee: KneeIcon,
    hip: HipIcon,
    shoulder: ShoulderIcon,
};

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
}

export const FONT_COLORS = {
    primary: 'text-arnotBlue',
    secondary: 'text-teal-500',
}

export const HOVER_FONT_COLORS = {
    primary: 'hover:text-arnotBlue',
    secondary: 'hover:text-teal-500',
}