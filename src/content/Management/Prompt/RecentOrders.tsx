import { Card } from '@mui/material';
import { CryptoOrder } from '@/models/data';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: CryptoOrder[] = [
    {
      id: '1',
      orderDetails: 'Module 1',
      orderDate: new Date().getTime(),
      status: 'completed',
      orderID: 'Goal Setting, Vision, and Mindset',
      sourceName:
        'https://courses.tradies-success-academy.com/ModuleLibrary/Download?moduleId=2657939',
      sourceDesc: '*** 1111',
      amountCrypto:
        'https://docs.google.com/document/u/0/d/1HUTEsKwq_zSPc9QBsbhDC21B8fWUB4ZWLehiUbstxKk/edit',
      amount: 56787,
      cryptoCurrency: 'ETH',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Module 2',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'Goal Setting, Vision, and Mindset',
      sourceName:
        'https://courses.tradies-success-academy.com/ModuleLibrary/Download?moduleId=2657939',
      sourceDesc: '*** 1111',
      amountCrypto:
        'https://docs.google.com/document/u/0/d/1HUTEsKwq_zSPc9QBsbhDC21B8fWUB4ZWLehiUbstxKk/edit',
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Module 2',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'Goal Setting, Vision, and Mindset',
      sourceName:
        'https://courses.tradies-success-academy.com/ModuleLibrary/Download?moduleId=2657939',
      sourceDesc: '*** 1111',
      amountCrypto:
        'https://docs.google.com/document/u/0/d/1HUTEsKwq_zSPc9QBsbhDC21B8fWUB4ZWLehiUbstxKk/edit',
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Module 2',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'Goal Setting, Vision, and Mindset',
      sourceName:
        'https://courses.tradies-success-academy.com/ModuleLibrary/Download?moduleId=2657939',
      sourceDesc: '*** 1111',
      amountCrypto:
        'https://docs.google.com/document/u/0/d/1HUTEsKwq_zSPc9QBsbhDC21B8fWUB4ZWLehiUbstxKk/edit',
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Module 2',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'Goal Setting, Vision, and Mindset',
      sourceName:
        'https://courses.tradies-success-academy.com/ModuleLibrary/Download?moduleId=2657939',
      sourceDesc: '*** 1111',
      amountCrypto:
        'https://docs.google.com/document/u/0/d/1HUTEsKwq_zSPc9QBsbhDC21B8fWUB4ZWLehiUbstxKk/edit',
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Module 2',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'Goal Setting, Vision, and Mindset',
      sourceName:
        'https://courses.tradies-success-academy.com/ModuleLibrary/Download?moduleId=2657939',
      sourceDesc: '*** 1111',
      amountCrypto:
        'https://docs.google.com/document/u/0/d/1HUTEsKwq_zSPc9QBsbhDC21B8fWUB4ZWLehiUbstxKk/edit',
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Module 2',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'Goal Setting, Vision, and Mindset',
      sourceName:
        'https://courses.tradies-success-academy.com/ModuleLibrary/Download?moduleId=2657939',
      sourceDesc: '*** 1111',
      amountCrypto:
        'https://docs.google.com/document/u/0/d/1HUTEsKwq_zSPc9QBsbhDC21B8fWUB4ZWLehiUbstxKk/edit',
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Module 2',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'Goal Setting, Vision, and Mindset',
      sourceName:
        'https://courses.tradies-success-academy.com/ModuleLibrary/Download?moduleId=2657939',
      sourceDesc: '*** 1111',
      amountCrypto:
        'https://docs.google.com/document/u/0/d/1HUTEsKwq_zSPc9QBsbhDC21B8fWUB4ZWLehiUbstxKk/edit',
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    }
  ];

  return <RecentOrdersTable cryptoOrders={cryptoOrders} />;
}

export default RecentOrders;
