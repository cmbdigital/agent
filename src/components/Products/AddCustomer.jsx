import { setPayload } from '@/redux/payloadSlice'
import { registerCustomer } from '@/services/api'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const AddCustomer = ({ setSteps, agent }) => {

    const dispatch = useDispatch()

    const [name, setName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [adhaarNumber, setAdhaarNumber] = React.useState('')
    const [panNumber, setPanNumber] = React.useState('')
    const [adhaarImage, setAdhaarImage] = React.useState('rgwerg')
    const [panImage, setPanImage] = React.useState('gwegew')
    const [guarantorName, setGuarantorName] = React.useState('')
    const [guarantorPhone, setGuarantorPhone] = React.useState('')
    const [guarantorAdhaarNumber, setGuarantorAdhaarNumber] = React.useState('')
    const [guarantorAdhaarImage, setGuarantorAdhaarImage] = React.useState('egewgg')
    const [error, setError] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [address, setAddress] = React.useState('')
    const [city, setCity] = React.useState('')
    const [state, setState] = React.useState('')
    const [pincode, setPincode] = React.useState('')

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }

        })
    }

    const uploadAdhaarImage = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        setAdhaarImage(base64)
    }

    const uploadPanImage = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        setPanImage(base64)
    }

    const uploadGuarantorAdhaarImage = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        setGuarantorAdhaarImage(base64)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            phone,
            adhaarNumber,
            panNumber,
            adhaarImage,
            panImage,
            guarantorName,
            guarantorPhone,
            guarantorAdhaarNumber,
            guarantorAdhaarImage,
            branchCode: agent.branchCode,
            agent: agent._id,
            pincode,
            address,
            city,
            state
        }

        try {
            const { data } = await registerCustomer(payload);
            toast.success('Customer added successfully')
            dispatch(setPayload({
                customer: {
                    customerId: data._id,
                    name: data.name,
                    phone: data.phone,
                    adhaarNumber: data.adhaarNumber,
                    panNumber: data.panNumber
                },
                guarantor: {
                    name: data.guarantorName,
                    adhaarNumber: data.guarantorAdhaarNumber,
                    adhaarImage: data.guarantorAdhaarImage,
                    phone: data.guarantorPhone,
                }
            }))
            setSteps(2)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    return (
        <>
            <h1 className='font-bold text-lg p-4'>Add Customer Details</h1>

            <div className='px-4 bg-white rounded-lg'>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div className='flex gap-2 mb-1 flex-col lg:flex-row'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Customer Name</span>
                            </label>
                            <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} placeholder="Customer Name" className="input input-bordered text-xs" />
                            {
                                error.name && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Customer Phone Number</span>
                            </label>
                            <input type="text" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Customer Phone Number" className="input input-bordered text-xs" />
                            {
                                error.phone && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>
                    </div>

                    <div className='flex gap-2 mb-1 flex-col lg:flex-row'>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Customer Adhaar Number</span>
                            </label>
                            <input type="text" defaultValue={adhaarNumber} onChange={(e) => setAdhaarNumber(e.target.value)} placeholder="Customer Adhaar Number" className="input input-bordered text-xs" />
                            {
                                error.adhaarNumber && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Customer PAN Number</span>
                            </label>
                            <input type="text" defaultValue={panNumber} onChange={(e) => setPanNumber(e.target.value)} placeholder="Customer PAN Number" className="input input-bordered text-xs" />
                            {
                                error.panNumber && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>
                    </div>

                    <div className='flex gap-2 mb-1 flex-col lg:flex-row'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Customer Adhaar Card</span>
                            </label>
                            {
                                adhaarImage && <img src={adhaarImage} className='h-auto w-24 mb-1 rounded-lg' />
                            }
                            <input type="file" onChange={uploadAdhaarImage} placeholder="Adhaar Card" className="file file-input text-xs" />
                            {
                                error.adhaarImage && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Customer PAN Card</span>
                            </label>
                            {
                                panImage && <img src={panImage} className='h-auto w-24 mb-1 rounded-lg' />
                            }
                            <input type="file" onChange={uploadPanImage} placeholder="Adhaar Card" className="file file-input text-xs" />
                            {
                                error.panImage && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>
                    </div>

                    <h1 className='font-bold text-lg mt-8'>Guarantor Details</h1>

                    <div className='flex gap-2 mb-1 flex-col lg:flex-row'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Guarantor Name</span>
                            </label>
                            <input type="text" defaultValue={guarantorName} onChange={(e) => setGuarantorName(e.target.value)} placeholder="Guarantor Name" className="input input-bordered text-xs" />
                            {
                                error.guarantorName && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Guarantor Phone</span>
                            </label>
                            <input type="text" defaultValue={guarantorPhone} onChange={(e) => setGuarantorPhone(e.target.value)} placeholder="Guarantor Phone Number" className="input input-bordered text-xs" />
                            {
                                error.guarantorPhone && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>
                    </div>

                    <div className='flex gap-2 mb-1 flex-col lg:flex-row items-end'>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Guarantor Adhaar Number</span>
                            </label>
                            <input type="text" defaultValue={guarantorAdhaarNumber} onChange={(e) => setGuarantorAdhaarNumber(e.target.value)} placeholder="Guarantor Adhaar Number" className="input input-bordered text-xs" />
                            {
                                error.guarantorAdhaarNumber && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Guarantor Adhaar Card</span>
                            </label>
                            {
                                guarantorAdhaarImage && <img src={guarantorAdhaarImage} className='h-auto w-24 mb-1 rounded-lg' />
                            }
                            <input type="file" onChange={uploadGuarantorAdhaarImage} placeholder="Adhaar Card" className="file file-input text-xs" />
                            {
                                error.guarantorAdhaarImage && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>
                    </div>

                    <h1 className='font-bold text-lg mt-8'>Address Details</h1>

                    <div className='flex gap-2 mb-1 flex-col lg:flex-row'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" defaultValue={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="input input-bordered text-xs" />
                            {
                                error.address && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <input type="text" defaultValue={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="input input-bordered text-xs" />
                            {
                                error.guarantorPhone && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>
                    </div>

                    <div className='flex gap-2 mb-1 flex-col lg:flex-row'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">State</span>
                            </label>
                            <input type="text" defaultValue={state} onChange={(e) => setState(e.target.value)} placeholder="Address" className="input input-bordered text-xs" />
                            {
                                error.state && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Pincode</span>
                            </label>
                            <input type="number" defaultValue={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="City" className="input input-bordered text-xs" />
                            {
                                error.pincode && <label className="label">
                                    <span className="label-text-alt text-red-500">Please enter data</span>
                                </label>
                            }
                        </div>
                    </div>

                    <button type='submit' className='text-xs bg-blue-500 btn capitalize hover:bg-blue-600 text-white rounded-lg w-full mb-4' >Add Customer</button>
                </form>
            </div>
        </>
    )
}

export default AddCustomer;