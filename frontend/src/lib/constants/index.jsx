import {
	HiOutlineViewGrid,
} from 'react-icons/hi'
import { FaRegFileAlt } from "react-icons/fa";
import { BsExclamationDiamond } from "react-icons/bs";

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


    

]

