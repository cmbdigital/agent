import React, { useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import EMICalc from './EMICalc'
import AddCustomer from './AddCustomer'
import { useSelector } from 'react-redux'
import CreateOrder from './CreateOrder'
import { useRouter } from 'next/router'

const EMIModal = ({ setShowModal, selectedEMI }) => {

    const [steps, setSteps] = React.useState(0);
    const agent = useSelector(state => state.auth.user);
    const order = useSelector(state => state.payload.order);
    const router = useRouter();

    useEffect(() => {
        if (!order.branch) {
            router.replace('/products')
        }
    }, [])

    return (
        <>
            <div className='fixed z-50 left-0 top-0 h-screen w-full bg-black opacity-50' onClick={(e) => setShowModal(false)}></div>
            <div className='fixed z-50 left-0 lg:left-1/2 lg:-translate-x-1/2 bottom-0 lg:bottom-1/2 lg:translate-y-1/2 bg-white rounded-t-lg w-full lg:w-2/5 shadow-xl overflow-auto'>
                <div className='flex justify-between items-center p-4 border-b sticky top-0 bg-white z-30'>
                    <h1 className='text-sm font-semibold capitalize'>Place Order</h1>
                    <button className='text-xl' onClick={(e) => setShowModal(false)}>
                        <IoMdClose />
                    </button>
                </div>

                <div>

                    <div className='flex justify-center items-center my-4'>
                        <ul className="steps steps-horizontal w-full z-10">
                            <li className={`step step-primary`}>Choose plan</li>
                            <li className={`step ${steps > 0 && "step-primary"}`}>Add Customer Details</li>
                            <li className={`step ${steps > 1 && "step-primary"}`}>Place Order</li>
                        </ul>
                    </div>

                    <div className='max-h-[500px]'>
                        {
                            steps === 0 && <EMICalc selectedEMI={selectedEMI} setSteps={setSteps} />
                        }
                        {
                            steps === 1 && <AddCustomer setSteps={setSteps} agent={agent} />
                        }
                        {
                            steps === 2 && <CreateOrder setSteps={setSteps} />
                        }
                    </div>

                </div>

            </div>
        </>
    )
}

export default EMIModal