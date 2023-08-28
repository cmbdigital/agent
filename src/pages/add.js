import { ProtectedRoute } from '@/utils/ProtectedRoute'
import React from 'react'

const AddCustomer = () => {

    const [name, setName] = React.useState('')
    const [adhaarNumber, setAdhaarNumber] = React.useState('')
    const [panNumber, setPanNumber] = React.useState('')
    const [adhaarImage, setAdhaarImage] = React.useState('')
    const [panImage, setPanImage] = React.useState('')

    const [guarantorName, setGuarantorName] = React.useState('')
    const [guarantorAdhaarNumber, setGuarantorAdhaarNumber] = React.useState('')
    const [guarantorAdhaarImage, setGuarantorAdhaarImage] = React.useState('')

    const [error, setError] = React.useState({})

    const [image, setImage] = React.useState('')

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

        if (!name) {
            return setError({ name: true })
        }
    }

    return (
        <ProtectedRoute>
            <div className='p-4'>
                <h1 className='font-bold text-xl mb-4'>Add Customers</h1>

                <div className='p-4 bg-white rounded-lg'>
                    <form className='flex flex-col gap-3'>

                        <div className='flex gap-2 mb-2 flex-col lg:flex-row'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Customer Name</span>
                                </label>
                                <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" className="input input-bordered text-xs" />
                                {
                                    error.name && <label className="label">
                                        <span className="label-text-alt text-red-500">Please enter data</span>
                                    </label>
                                }
                            </div>
                        </div>

                        <div className='flex gap-2 mb-2 flex-col lg:flex-row'>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Customer Adhaar Number</span>
                                </label>
                                <input type="text" defaultValue={name} onChange={(e) => setAdhaarNumber(e.target.value)} placeholder="Product Name" className="input input-bordered text-xs" />
                                {
                                    error.name && <label className="label">
                                        <span className="label-text-alt">Please enter data</span>
                                    </label>
                                }
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Customer PAN Number</span>
                                </label>
                                <input type="text" defaultValue={name} onChange={(e) => setPanNumber(e.target.value)} placeholder="Product Name" className="input input-bordered text-xs" />
                                {
                                    error.name && <label className="label">
                                        <span className="label-text-alt">Please enter data</span>
                                    </label>
                                }
                            </div>
                        </div>

                        <div className='flex gap-2 mb-2 flex-col lg:flex-row'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Customer Adhaar Card</span>
                                </label>
                                {
                                    adhaarImage && <img src={adhaarImage} className='h-auto w-24 mb-2 rounded-lg' />
                                }
                                <input type="file" onChange={uploadAdhaarImage} placeholder="Adhaar Card" className="file file-input text-xs" />
                                {
                                    error.name && <label className="label">
                                        <span className="label-text-alt">Please enter data</span>
                                    </label>
                                }
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Customer PAN Card</span>
                                </label>
                                {
                                    panImage && <img src={panImage} className='h-auto w-24 mb-2 rounded-lg' />
                                }
                                <input type="file" onChange={uploadPanImage} placeholder="Adhaar Card" className="file file-input text-xs" />
                                {
                                    error.name && <label className="label">
                                        <span className="label-text-alt">Please enter data</span>
                                    </label>
                                }
                            </div>
                        </div>

                        <h1 className='font-bold text-lg mt-8'>Guarantor Details</h1>

                        <div className='flex gap-2 mb-2 flex-col lg:flex-row'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Guarantor Name</span>
                                </label>
                                <input type="text" defaultValue={guarantorName} onChange={(e) => setGuarantorName(e.target.value)} placeholder="Product Name" className="input input-bordered text-xs" />
                                {
                                    error.name && <label className="label">
                                        <span className="label-text-alt">Please enter data</span>
                                    </label>
                                }
                            </div>
                        </div>

                        <div className='flex gap-2 mb-2 flex-col lg:flex-row items-end'>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Guarantor Adhaar Number</span>
                                </label>
                                <input type="text" defaultValue={guarantorAdhaarNumber} onChange={(e) => setGuarantorAdhaarNumber(e.target.value)} placeholder="Product Name" className="input input-bordered text-xs" />
                                {
                                    error.name && <label className="label">
                                        <span className="label-text-alt">Please enter data</span>
                                    </label>
                                }
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Guarantor Adhaar Card</span>
                                </label>
                                {
                                    guarantorAdhaarImage && <img src={guarantorAdhaarImage} className='h-auto w-24 mb-2 rounded-lg' />
                                }
                                <input type="file" onChange={uploadGuarantorAdhaarImage} placeholder="Adhaar Card" className="file file-input text-xs" />
                                {
                                    error.name && <label className="label">
                                        <span className="label-text-alt">Please enter data</span>
                                    </label>
                                }
                            </div>
                        </div>

                    </form>
                </div>

                <div className='flex mt-4'>
                    <button className='btn btn-primary w-full bg-blue-500 text-white' onClick={handleSubmit}>Add Customer</button>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default AddCustomer