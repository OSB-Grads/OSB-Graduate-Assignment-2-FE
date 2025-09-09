
import homeIcon from '../assets/Home-icon.png'
import accountIcon from '../assets/Accounts.png'

export type navItem={
    id:number,
    label:string,
    icon:string
};
export const LeftnavItems:navItem[]=[

    {
        id:1,
        label:"Dashboard",
        icon:homeIcon

    },
    {
        id:2,
        label:"Accounts",
        icon:accountIcon

    }
    
]