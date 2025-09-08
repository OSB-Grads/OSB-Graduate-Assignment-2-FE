
import quick1 from  '../assets/quickList-1.png'
import quick2 from  '../assets/QuickList-2.png'
import quick3 from  '../assets/QuickList-3.png'

export type QuickList={
    id:number,
    label:string,
    subLabel:string,
    path:string,
    icon:string
};



export const QuickActionListData:QuickList[]=[
    
{
     id: 1,
    label: 'Transfer',
    subLabel: 'Transfer money',
    path: '/transactions',
    icon: quick1,
},
{
     id: 2,
    label: 'Make Payment',
    subLabel: 'Pay someone',
    path: '',
    icon: quick2,
},
{
     id: 3,
    label:'Create Account',
    subLabel:'Create an account',
    path: '',
    icon: quick3,
}

]