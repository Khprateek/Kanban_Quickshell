import urgentIcon from '../assets/icons/Urgent.svg';
import highIcon from '../assets/icons/High.svg';
import mediumIcon from '../assets/icons/Medium.svg';
import lowIcon from '../assets/icons/Low.svg';
import NoIcon from '../assets/icons/No-priority.svg';
import todoIcon from '../assets/icons/To-do.svg';
import inProgressIcon from '../assets/icons/in-progress.svg';
import doneIcon from '../assets/icons/Done.svg';
import canceledIcon from '../assets/icons/Cancelled.svg';
import backlogIcon from '../assets/icons/Backlog.svg';

export const PRIORITIES = {
  4: { label: 'Urgent', icon: urgentIcon },
  3: { label: 'High', icon: highIcon },
  2: { label: 'Medium', icon: mediumIcon },
  1: { label: 'Low', icon: lowIcon },
  0: { label: 'No priority', icon: NoIcon }
};

export const STATUS_ICONS = {
  'Todo': todoIcon,
  'In Progress': inProgressIcon,
  'In progress': inProgressIcon,
  'in-progress': inProgressIcon,
  'Done': doneIcon,
  'Canceled': canceledIcon,
  'Backlog': backlogIcon
};

export const USER_STATUS = {
  active: '🟢',
  offline: '⚪'
};

export const PRIORITY_LEVELS = PRIORITIES;
export const STATUS_TYPES = STATUS_ICONS;