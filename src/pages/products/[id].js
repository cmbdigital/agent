import EMIModal from '@/components/Products/EMIModal';
import { getProductById } from '@/services/api';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { addMonths, format, addWeeks } from 'date-fns'
import { useDispatch } from 'react-redux';
import { setPayload } from '@/redux/payloadSlice';

const ProductDetails = () => {

    const router = useRouter();
    const { id, branch } = router.query;
    const dispatch = useDispatch()

    const [product, setProduct] = React.useState({});
    const [showModal, setShowModal] = React.useState(false);
    const [selectedEMI, setSelectedEMI] = React.useState({});
    const [emis, setEmis] = React.useState({
        processingFee: 0,
        downPayment: 0,
        noCostEMIOf3Months: 0,
        emiOf6Months: 0,
        emiOf9Months: 0,
        emiOf25Weeks: 0,
        emiOf20Weeks: 0,
        downPaymentForWeekly: 0
    });

    useEffect(() => {
        document.title = 'Product Details'
    }, [])

    const calculateEMI = (amount) => {
        // processing fee
        const processingFee = (amount * 3) / 100;

        // down payment for monthly EMI
        const downPayment = amount * (30 / 100);

        // down payment for weekly EMI
        const downPaymentForWeekly = (+amount + +(amount * 0.14));

        const remainingAmount = amount - downPayment;

        // no cost EMI of 3 months
        const noCostEMIOf3Months = remainingAmount / 3;

        // EMI of 6 months with 14% interest
        const emiOf6Months = (remainingAmount + (remainingAmount * (14 / 100))) / 6;

        // EMI of 9 months with 18% interest
        const emiOf9Months = (remainingAmount + (remainingAmount * (18 / 100))) / 9;

        // EMI of 25 Weeks with 14% interest
        const emiOf25Weeks = downPaymentForWeekly / 25;

        // EMI of 20 Weeks with 14% interest
        const emiOf20Weeks = downPaymentForWeekly / 20;

        setEmis({
            processingFee,
            downPayment,
            noCostEMIOf3Months,
            emiOf6Months,
            emiOf9Months,
            emiOf25Weeks,
            emiOf20Weeks,
            downPaymentForWeekly
        })
    }

    useEffect(() => {
        // fetch product details
        const fetchProductDetails = async () => {
            try {
                const { data } = await getProductById(id);
                setProduct(data.data);
                calculateEMI(Number(data.data?.discountedPrice));
            } catch (error) {
                console.log(error);
            }
        }

        fetchProductDetails();
    }, [])

    const handlePurchase = (payload) => {
        setSelectedEMI({ ...payload, processingFee: emis.processingFee, cost: product.discountedPrice });
        dispatch(setPayload({
            product: {
                productId: product._id,
                name: product.name,
                mrp: product.mrp,
                discountedPrice: product.discountedPrice,
                skuId: product.skuId
            },
            branch
        }))
        setShowModal(true);
    }

    return (

        <div>
            <section className="text-gray-600 bg-white m-4 rounded-lg overflow-hidden">
                <div className="container px-5 py-5 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{product?.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">{product?.name}</h1>
                            <p className="leading-relaxed">{product?.details}</p>
                            <div className="flex mt-4">
                                <div>
                                    <span className="title-font font-bold text-2xl text-red-500">₹{Number((product?.discountedPrice)).toLocaleString()}</span>
                                    <span className="text-sm ml-2 line-through text-gray-500">₹{Number((product?.mrp)).toLocaleString()}</span>
                                </div>
                            </div>

                            <hr className='my-4' />

                            <h1>
                                Processing Fees: <span className='font-medium'>₹{emis.processingFee}</span>
                            </h1>

                            <h1 className='mt-2'>Choose EMI Tenure [Monthly]</h1>

                            <div className='flex flex-col gap-4 mt-2'>
                                <div className='flex justify-between items-center w-full'>
                                    <div className='flex justify-center items-start gap-2'>
                                        <div className='flex flex-col'>
                                            <span className="title-font font-medium text-sm lg:text-lg text-blue-500">₹{Number(Math.ceil((emis.noCostEMIOf3Months))).toLocaleString()} x 3 Months</span>
                                            <span className='text-xs font-medium'>(+ ₹{emis.downPayment} DownPayment)</span>
                                        </div>
                                        <span className='text-[10px] bg-blue-500 text-white p-0 rounded-full px-3 hidden lg:block'>0% EMI</span>
                                    </div>
                                    <button className='btn btn-sm text-xs capitalize bg-blue-500 text-white hover:bg-blue-600' onClick={() => handlePurchase({ downPayment: emis.downPayment, emi: emis.noCostEMIOf3Months, tenure: 3 })}>Buy on 3 Months EMI</button>
                                </div>


                                <div className='flex justify-between items-center w-full'>
                                    <div className='flex flex-col'>
                                        <span className="title-font font-medium text-sm lg:text-lg text-blue-500">₹{Number(Math.ceil((emis.emiOf6Months))).toLocaleString()} x 6 Months</span>
                                        <span className='text-xs font-medium'>(+ ₹{emis.downPayment} DownPayment)</span>
                                    </div>

                                    <button className='btn btn-sm text-xs capitalize bg-blue-500 text-white hover:bg-blue-600' onClick={() => handlePurchase({ downPayment: emis.downPayment, emi: emis.emiOf6Months, tenure: 6 })}>Buy on 6 Months EMI</button>
                                </div>


                                <div className='flex justify-between items-center w-full'>
                                    <div className='flex flex-col'>
                                        <span className="title-font font-medium text-sm lg:text-lg text-blue-500">₹{Number(Math.ceil((emis.emiOf9Months))).toLocaleString()} x 9 Months</span>
                                        <span className='text-xs font-medium'>(+ ₹{emis.downPayment} DownPayment)</span>
                                    </div>

                                    <button className='btn btn-sm text-xs capitalize bg-blue-500 text-white hover:bg-blue-600' onClick={() => handlePurchase({ downPayment: emis.downPayment, emi: emis.emiOf9Months, tenure: 9 })}>Buy on 9 Months EMI</button>
                                </div>
                            </div>

                            <h1 className='mt-4'>
                                EMI will start from <span className='font-medium'>
                                    {format(addMonths(new Date(), 1), 'dd MMMM yyyy')}
                                </span>
                            </h1>

                            <hr className='my-4' />

                            <h1 className='mt-2'>Choose EMI Tenure [Weekly]</h1>

                            <div className='flex flex-col gap-4 mt-2'>

                                <div className='flex justify-between items-center w-full'>
                                    <div className='flex flex-col'>
                                        <span className="title-font font-medium text-sm lg:text-lg text-blue-500">₹{Number(Math.ceil((emis.emiOf20Weeks))).toLocaleString()} x 20 Weeks</span>
                                        <span className='text-xs font-medium'>(+ ₹{(emis.downPaymentForWeekly) / 20} DownPayment)</span>
                                    </div>

                                    <button className='btn btn-sm text-xs capitalize bg-blue-500 text-white hover:bg-blue-600' onClick={() => handlePurchase({ downPayment: (emis.downPaymentForWeekly) / 20, emi: emis.emiOf20Weeks, tenure: 20 })}>Buy on 20 Weeks EMI</button>
                                </div>


                                <div className='flex justify-between items-center w-full'>
                                    <div className='flex flex-col'>
                                        <span className="title-font font-medium text-sm lg:text-lg text-blue-500">₹{Number(Math.ceil((emis.emiOf25Weeks))).toLocaleString()} x 25 Weeks</span>
                                        <span className='text-xs font-medium'>(+ ₹{(emis.downPaymentForWeekly) / 25} DownPayment)</span>
                                    </div>

                                    <button className='btn btn-sm text-xs capitalize bg-blue-500 text-white hover:bg-blue-600' onClick={() => handlePurchase({ downPayment: (emis.downPaymentForWeekly) / 25, emi: emis.emiOf25Weeks, tenure: 25 })}>Buy on 25 Weeks EMI</button>
                                </div>
                            </div>

                            <h1 className='mt-4'>
                                EMI will start from <span className='font-medium'>
                                    {format(addWeeks(new Date(), 1), 'dd MMMM yyyy')}
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {
                showModal && <EMIModal setShowModal={setShowModal} selectedEMI={selectedEMI} />
            }

        </div>
    )
}

export default ProductDetails