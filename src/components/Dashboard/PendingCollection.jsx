import Link from 'next/link'
import React from 'react'

const PendingCollection = ({ product }) => {
    return (
        <Link href={`/orders/${product._id}`}>
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center bg-gray-100 p-3 rounded-lg hover:border-black border cursor-pointer'>

                <div className='flex items-center gap-2'>
                    <img src='/empty.webp' className='h-12 w-12 rounded-lg' />
                    <div>
                        <h1 className='text-sm'>{product.customer.name}</h1>
                        <h1 className='text-sm font-semibold'>₹{product.totalPayment} &nbsp; <span className='font-normal'>Pending: </span> ₹{product.emi.emiAmountPending}</h1>
                    </div>
                </div>

                <div className=''>
                    <div className='flex items-center justify-between'>
                        <span className=' text-sm'>₹0</span>
                        <span className='text-sm'>₹{product.totalPayment}</span>
                    </div>
                    <div className="tooltip" data-tip={`₹${product.emi.emiAmountPaid} Collected`}>
                        <progress className="progress progress-success w-56" value={product.emi.emiAmountPaid} max={product.totalPayment}></progress>
                    </div>
                </div>

                <div>
                    <h1 className='text-sm'>{new Date(product.date).toDateString()}</h1>
                    <h1 className='text-sm font-semibold'>EMI tenure: {product.emi.emiTenure} {product.emi.emiTenure > 10 ? "Weeks" : "Months"}</h1>
                </div>
            </div>
        </Link>
    )
}

export default PendingCollection