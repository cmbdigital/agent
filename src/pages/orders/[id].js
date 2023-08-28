import { getOrder } from '@/services/api';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const OrderDetails = () => {

    const router = useRouter();
    const { id } = router.query;

    const [order, setOrder] = React.useState({});

    useEffect(() => {
        document.title = 'Product Details'
    }, [])

    useEffect(() => {
        // fetch product details
        const fetchOrderDetails = async () => {
            try {
                const { data } = await getOrder(id);
                setOrder(data.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchOrderDetails();
    }, [])

    console.log(order.emi)

    return (

        <div className='p-4'>

            <div className='w-full bg-white rounded-lg p-4 mx-auto'>
                <div className='flex justify-between items-center'>
                    <h1 className='uppercase font-bold text-sm'>Order Details</h1>

                </div>

                <div className='gap-4 mt-4'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Order Total</label>
                            <p className='text-sm'>₹{Number(order?.orderTotal).toLocaleString()}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Total Payment</label>
                            <p className='text-sm'>₹{Number(order?.totalPayment).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Order Date</label>
                            <p className='text-sm'>{new Date(order?.createdAt)?.toDateString()}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Order Status</label>
                            <p className='text-sm'>{order?.emi?.status}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='w-full bg-white rounded-lg p-4 mx-auto mt-10'>
                <h1 className='uppercase font-bold text-sm'>Product Details</h1>

                <div className='gap-4 mt-4'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Product Name</label>
                            <p className='text-sm'>{order.product?.name}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>SkuID</label>
                            <p className='text-sm'>{order.product?.skuId}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>MRP</label>
                            <p className='text-sm'>₹{Number(order.product?.mrp).toLocaleString()}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Discounted Price</label>
                            <p className='text-sm'>₹{Number(order.product?.discountedPrice).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='w-full bg-white rounded-lg p-4 mx-auto mt-10'>
                <h1 className='uppercase font-bold text-sm'>Address Details</h1>

                <div className='gap-4 mt-4'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Address</label>
                            <p className='text-sm'>{order?.address}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Code</label>
                            <p className='text-sm'>{order?.customer?.code}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Email</label>
                            <p className='text-sm'>{order?.customer?.email}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Contact</label>
                            <p className='text-sm'>{order?.customer?.phone}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Branch Code</label>
                            <p className='text-sm'>{order?.customer?.branchCode}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>PAN Number</label>
                            <p className='text-sm'>{order?.customer?.pan}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Date Of Birth</label>
                            <p className='text-sm'>{order?.customer?.dob}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='w-full bg-white rounded-lg p-4 mx-auto mt-10'>
                <h1 className='uppercase font-bold text-sm'>Customer Details</h1>

                <div className='gap-4 mt-4'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Name</label>
                            <p className='text-sm'>{order?.customer?.name}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Code</label>
                            <p className='text-sm'>{order?.customer?.code}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Email</label>
                            <p className='text-sm'>{order?.customer?.email}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Contact</label>
                            <p className='text-sm'>{order?.customer?.phone}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Branch Code</label>
                            <p className='text-sm'>{order?.customer?.branchCode}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>PAN Number</label>
                            <p className='text-sm'>{order?.customer?.pan}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Date Of Birth</label>
                            <p className='text-sm'>{order?.customer?.dob}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='w-full bg-white rounded-lg p-4 mx-auto mt-10'>
                <h1 className='uppercase font-bold text-sm'>Guarantor Details</h1>

                <div className='gap-4 mt-4'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Name</label>
                            <p className='text-sm'>{order?.guarantor?.name}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Adhaar Number</label>
                            <p className='text-sm'>{order?.guarantor?.adhaarNumber}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Phone</label>
                            <p className='text-sm'>{order?.guarantor?.phone}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='w-full bg-white rounded-lg p-4 mx-auto mt-10'>
                <h1 className='uppercase font-bold text-sm'>EMI Details</h1>

                <div className='gap-4 mt-4'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>EMI Amount</label>
                            <p className='text-sm'>{Number(order?.emi?.emiAmount).toLocaleString()}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>EMI DownPayment</label>
                            <p className='text-sm'>{Number(order?.emi?.emiDownPayment).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>EMI ProcessingFee</label>
                            <p className='text-sm'>{Number(order?.emi?.emiProcessingFee).toLocaleString()}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>EMI Tenure</label>
                            <p className='text-sm'>{order?.emi?.emiTenure}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>EMI Start Date</label>
                            <p className='text-sm'>{new Date(order?.emi?.emiStartDate).toDateString()}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>EMI End Date</label>
                            <p className='text-sm'>{new Date(order?.emi?.emiEndDate).toDateString()}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-start w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>EMI Pending Dates</label>
                            {
                                order?.emi?.emiPendingDates?.map((date, index) => (
                                    <p className='text-sm'>{new Date(date).toDateString()}</p>
                                ))
                            }
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>EMI Paid Dates</label>
                            {
                                order?.emi?.emiPaidDates?.map((date, index) => (
                                    <p className='text-sm'>{new Date(date).toDateString()}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>

            <div className='w-full bg-white rounded-lg p-4 mx-auto mt-10'>
                <h1 className='uppercase font-bold text-sm'>Agent Details</h1>

                <div className='gap-4 mt-4'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Name</label>
                            <p className='text-sm'>{order?.agent?.name}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Code</label>
                            <p className='text-sm'>{order?.agent?.code}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Email</label>
                            <p className='text-sm'>{order?.agent?.email}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Contact</label>
                            <p className='text-sm'>{order?.agent?.phone}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Branch Code</label>
                            <p className='text-sm'>{order?.agent?.branchCode}</p>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>PAN Number</label>
                            <p className='text-sm'>{order?.agent?.pan}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <div className='w-1/2'>
                            <label className='text-xs font-bold'>Date Of Birth</label>
                            <p className='text-sm'>{order?.agent?.dob}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderDetails