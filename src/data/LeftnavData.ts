import accountIcon from '../assets/Accounts.png';
import homeIcon from '../assets/Home-icon.png';
import profileIcon from '../assets/Navbar-profile-image.png';

export type navItem = {
    id: number,
    label: string,
    icon: string,
    path: string,

};

export const LeftnavItems: navItem[] = [

    {
        id: 1,
        label: "Dashboard",
        icon: homeIcon,
        path: '/'

    },
    {
        id: 2,
        label: "Accounts",
        icon: accountIcon,
        path: '/accountsPage'

    },
    {
        id: 3,
        label: "Products",
        icon: accountIcon,
        path: '/products'
    },
    {
        id: 5,
        label: "Profile",
        icon: profileIcon,
        path: '/Profile'
    }


]