import { collectEMI } from '@/services/api';
import { addMonths, addWeeks, format, set } from 'date-fns';
import React from 'react'
import { toast } from 'react-hot-toast';

const CollectEmiModal = ({ showModal, setShowModal, selectedOrder, fetchFinancedProducts }) => {

    const handleCollectEMI = async () => {
        try {
            const { data } = await collectEMI(selectedOrder._id);
            console.log(data)
            toast.success('EMI collected')
            fetchFinancedProducts();
            setShowModal(!showModal);
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <>
            <div className="fixed z-50 left-0 top-0 h-screen w-full bg-black opacity-50" onClick={() => setShowModal(!showModal)}></div>
            <div className='fixed z-50 left-0 lg:left-1/2 lg:-translate-x-1/2 bottom-0 lg:bottom-1/2 lg:translate-y-1/2 bg-white rounded-t-lg w-full lg:w-1/3 shadow-xl overflow-auto'>
                <div className='p-4'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-lg font-bold'>Collect EMI</h1>
                        <button className='text-lg font-bold' onClick={() => setShowModal(!showModal)}>X</button>
                    </div>

                    <div className="stats shadow w-full text-center mt-2 bg-gray-100">
                        <div className="stat">
                            <div className="stat-title">Amount to Collect</div>
                            <div className="stat-value text-lg">₹{Math.ceil(selectedOrder.emi.emiAmount)}</div>
                            <div className="stat-desc">
                                Collecting Date: {(new Date()).toDateString()}
                                <br />
                                From: {selectedOrder.customer.name}
                            </div>
                        </div>
                    </div>

                    <div className='mt-4 flex justify-end'>
                        <button className='text-sm btn-sm btn bg-gray-400 mr-2' onClick={() => setShowModal(!showModal)}>Cancel</button>
                        <button className='text-sm btn btn-sm btn-error' onClick={handleCollectEMI}>Collect</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CollectEmiModal