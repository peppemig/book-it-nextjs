'use client'

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categoriesData } from "../navbar/categoriesData"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)

    const {register, handleSubmit, setValue, watch, formState: {errors}, reset} = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')
    
    const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value-1)
    }

    const onNext = () => {
        setStep((value) => value+1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [step])

    // RENDER DIFFERENT BODY CONTENT BASED ON LOCATION

    // STEP 0 -> select category
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categoriesData.map((cat) => (
                    <div key={cat.label} className="col-span-1">
                        <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === cat.label} label={cat.label} icon={cat.icon}/>
                    </div>
                ))}
            </div>
        </div>
    )

    // STEP 1 -> select location
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place located?" subtitle="Help guests find you!"/>
                <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)}/>
                <Map center={location?.latlng}/>
            </div>
        )
    }

    // STEP 2 -> home info
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your place" subtitle="What amenities do you have?"/>
                <Counter onChange={(value) => setCustomValue('guestCount', value)} title="Guests" subtitle="How many guests do you allow?" value={guestCount}/>
                <hr />
                <Counter onChange={(value) => setCustomValue('roomCount', value)} title="Rooms" subtitle="How many rooms do you have?" value={roomCount}/>
                <hr />
                <Counter onChange={(value) => setCustomValue('bathroomCount', value)} title="Bathrooms" subtitle="How many guests do you allow?" value={bathroomCount}/>
            </div>
        )
    }

    // STEP 3 -> home images
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!"/>
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}/>
            </div>
        )
    }

    return (
        <Modal 
            title="Rent your home!" 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default RentModal