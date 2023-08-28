import Link from 'next/link'
import React from 'react'

const OrderCard = ({ order }) => {

    return (
        <Link href={`/orders/${order._id}`}>
            <div className='border rounded-lg p-3 cursor-pointer hover:bg-gray-50'>
                <div className='flex lg:items-center gap-2 flex-col lg:flex-row'>
                    <div className='flex lg:items-center gap-2 w-full lg:w-1/2 flex-col lg:flex-row'>
                        <img src='/empty.webp' className='h-12 w-12 rounded-lg' />
                        <div>
                            <h1 className='text-sm font-semibold'>{order.product.name}</h1>
                            <p className='text-xs text-gray-500'>{order.customer.name}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-2 w-1/4'>
                        <h1 className='text-sm font-semibold'>Customer: {order.quantity}</h1>
                        <p className='text-xs text-gray-500'>{order.customer.name}</p>
                    </div>
                    <div className='flex items-center justify-start gap-2 w-full lg:w-1/4'>
                        <div>
                            <h1 className='text-sm font-semibold'>₹{order.totalPayment}</h1>
                            <p className='text-xs text-gray-500 line-through'>₹{order.orderTotal}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OrderCard