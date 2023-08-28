import Link from 'next/link'
import React from 'react'

const ProductTable = ({ products }) => {
    return (
        <div className="overflow-x-auto w-full">
            <div className="overflow-hidden rounded-lg">
                <table className="w-full rounded-lg">
                    {
                        <thead className="bg-gray-100 text-black rounded-lg">
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3 px-6 text-left text-sm uppercase font-bold"
                                >
                                    Product
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 px-6 text-left text-sm uppercase font-bold"
                                >
                                    Category
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 px-6 text-left text-sm uppercase font-bold"
                                >
                                    Inventory
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 px-6 text-left text-sm uppercase font-bold"
                                >
                                    Price
                                </th>
                                <th
                                    scope="col"
                                    className="py-3 px-6 text-left text-sm uppercase font-bold"
                                >

                                </th>
                            </tr>
                        </thead>
                    }


                    <tbody className="bg-white divide-y divide-gray-100">
                        {products?.length > 0 ? (products?.map((product, i) => (
                            <tr key={product._id}>
                                <td className="px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <img src="/empty.webp" className="h-10 w-10 rounded-md" />
                                        <div className="text-sm text-gray-400 font-bold">{product?.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{product?.category}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{product?.quantity}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        ₹{product?.discountedPrice}
                                    </div>
                                </td>
                            </tr>
                        ))) : <div className='flex flex-col gap-2 h-96 justify-center items-center w-full'>
                            <img src='/empty.webp' />
                            <h1 className='font-bold'>No Data...</h1>
                        </div>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductTable