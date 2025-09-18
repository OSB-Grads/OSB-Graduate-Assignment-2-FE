
import quick1 from  '../assets/transfer-quick-action-icon.png'
import quick2 from  '../assets/payment-quick-action-icon.png'
import quick3 from  '../assets/account-quick-action-icon.png'

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
    path: '/payments',
    icon: quick1,
},
{
     id: 2,
    label: 'Make Payment',
    subLabel: 'Pay someone',
    path: '/payments',
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