import React from 'react'
import { format, addMonths, addWeeks } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { setPayload } from '@/redux/payloadSlice';

const EMICalc = ({ selectedEMI, setSteps }) => {

    const { processingFee, downPayment, emi, tenure, cost } = selectedEMI;
    const agent = useSelector(state => state.auth.user);

    const dispatch = useDispatch()

    const calculateEMIDate = (date, tenure) => {
        let emiDates = [];

        for (let i = 1; i <= tenure; i++) {
            tenure > 10 ?
                emiDates.push(format(addWeeks(date, i), "yyyy-MM-dd HH:mm:ss.SSSXXX")) :
                emiDates.push(format(addMonths(date, i), "yyyy-MM-dd HH:mm:ss.SSSXXX"))
        }
        return emiDates;
    }

    const handleSubmit = () => {
        dispatch(setPayload({
            emi:
            {
                emiDownPayment: downPayment,
                emiAmount: emi,
                emiTenure: tenure,
                emiProcessingFee: processingFee,
                emiStartDate: new Date(),
                emiEndDate: calculateEMIDate(new Date(), tenure)[tenure - 1],
                emiPaid: 0,
                emiPending: tenure,
                emiPaidDates: [],
                emiPendingDates: calculateEMIDate(new Date(), tenure),
                emiPaidStatus: false,
                emiAmountPaid: processingFee + downPayment,
                emiAmountPending: Number(tenure * emi),
            },
            agent: agent._id,
            totalPayment: processingFee + downPayment + (emi * tenure),
            orderTotal: Number(cost)
        }))
        setSteps(1);
    }

    return (
        <>
            <div className='flex justify-center items-center p-4 bg-blue-50'>
                <span className='w-1/2 text-center'>
                    {format(new Date(), 'dd MMMM yy')} to {tenure > 10 ? format(addWeeks(new Date(), tenure), 'dd MMMM yyyy') : format(addMonths(new Date(), tenure), 'dd MMMM yy')}
                </span>
                <span className='w-1/2 text-center'>
                    Order Total : <b className='font-medium'>{cost}</b>
                </span>
            </div>

            <div>
                <div className='flex justify-between items-center p-4 border-b'>
                    <span className='text-sm capitalize'>Processing Fee</span>
                    <span className='text-sm font-semibold capitalize'>₹{processingFee}</span>
                </div>

                <div className='flex justify-between items-center p-4 border-b'>
                    <span className='text-sm capitalize'>Down Payment</span>
                    <span className='text-sm font-semibold capitalize'>₹{downPayment}</span>
                </div>

                <div className='flex justify-between items-center p-4 border-b'>
                    <span className='text-sm capitalize'>EMI</span>
                    <span className='text-sm font-semibold capitalize'>₹{Math.round(Number(emi)).toLocaleString()} x {tenure} {tenure > 10 ? "Weeks" : "Months"}</span>
                </div>

                <div className='flex justify-between items-center p-4 border-b'>
                    <span className='text-sm font-semibold capitalize'>Total Payment</span>
                    <span className='text-sm font-semibold capitalize'>₹{processingFee + downPayment + (emi * tenure)}</span>
                </div>
            </div>

            <div className='flex justify-center items-center p-4'>
                <button className='text-xs bg-blue-500 btn capitalize hover:bg-blue-600 text-white rounded-lg w-full' onClick={handleSubmit}>Next</button>
            </div>
        </>
    )
}

export default EMICalc