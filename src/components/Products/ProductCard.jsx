import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product, branch }) => {

    return (
        <Link href={`/products/${product.skuId}?branch=${branch}`}>
            <div className='border rounded-lg p-3 cursor-pointer hover:bg-gray-50'>
                <div className='flex lg:items-center gap-2 flex-col lg:flex-row'>
                    <div className='flex lg:items-center gap-2 w-full lg:w-1/2 flex-col lg:flex-row'>
                        <img src='/empty.webp' className='h-12 w-12 rounded-lg' />
                        <div>
                            <h1 className='text-sm font-semibold'>{product.name}</h1>
                            <p className='text-xs text-gray-500'>{product.category}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-2 w-1/4'>
                        <h1 className='text-sm font-semibold'>Quantity: {product.quantity}</h1>
                    </div>
                    <div className='flex items-center justify-end gap-2 w-full lg:w-1/4'>
                        <div>
                            <h1 className='text-sm font-semibold'>₹{product.discountedPrice}</h1>
                            <p className='text-xs text-gray-500 line-through'>₹{product.mrp}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard