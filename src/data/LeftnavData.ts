import homeIcon from '../assets/Home-icon.png'
import accountIcon from '../assets/Accounts.png'
import paymentsIcon from '../assets/Payments.png'
import productIcon from "../assets/Product.png"

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
        id:3,
        label:"Products",
        icon:productIcon,
        path:'/products'
    },
    {
       id:4,
        label:"Payments",
        icon:paymentsIcon,
        path:'/payments' 
    }



]