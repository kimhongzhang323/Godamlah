import {
	HiOutlineViewGrid,
} from 'react-icons/hi'
import { FaRegFileAlt } from "react-icons/fa";
import { BsExclamationDiamond } from "react-icons/bs";
import { MdDevices } from "react-icons/md";
import path from 'path';

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},

    {
        key: 'Reports',
        label: 'Reports',
        path: '/reports',
		icon: <FaRegFileAlt />

        
    },
	{
        key: 'Risk Management',
        label: 'Risk Management',
        path: '/risk-management',
		icon: <BsExclamationDiamond />

        
    },
	{
		key: 'My Devices',
		label: 'My Devices',
		path: '/my-devices',
		icon: <MdDevices />

	}


    

]

