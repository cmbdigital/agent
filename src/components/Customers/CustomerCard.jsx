import Link from 'next/link'
import React from 'react'

const CustomerCard = ({ customer }) => {

    console.log(customer)

    return (
        <Link href={`/customers/${customer._id}`}>
            <div className='border rounded-lg p-3 cursor-pointer hover:bg-gray-50'>
                <div className='flex lg:items-center gap-2 flex-col lg:flex-row'>
                    <div className='flex lg:items-center gap-2 w-full lg:w-1/2 flex-col lg:flex-row'>
                        <img src='/empty.webp' className='h-12 w-12 rounded-lg' />
                        <div>
                            <h1 className='text-sm font-semibold'>{customer.name}</h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-2 w-full lg:w-1/4'>
                        <div>
                            <h1 className='text-sm font-semibold'>{customer.phone}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CustomerCard