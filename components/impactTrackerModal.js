import React, {useState} from 'react';

export function getDate () {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    const result = `${month}/${day}/${year}`
    return result
}

const impactTrackerModal = () => {
    const [impactTracker, setimpactTracker] = useState({
        impactFormStartDate: "",
        barrierHIVPrimaryCare: "",
        barrierAccessingMedications: "",
        medicationAdherence: "",
        CD4ViralLoad: false,
        viralLoadCount: "",
        CD4Count: "",
        lastHIVTest: false,
        PrEP: "",
        unsafeSexualBehavior: "",
        substanceAbuse: "",
        riskOfOverdose: "",
        legalIssues: "",
        unstableEmployment: "",
        mentalHealthIssues: "",
        unstableHousing: "",
        foodInsecurity: "",
    })
    const onValueChange=(event)=>{
        setimpactTracker({...impactTracker, [event.target.name]: event.target.value});
    }
    const onValueChangeInputRadio=(event)=>{
        if(event.target.value == 'true') {
            setImpactBaseline({
                ...impactBaseline,
                [event.target.name] : true
            })
        } 
        if (event.target.value == 'false') {
            setImpactBaseline({
                ...impactBaseline,
                [event.target.name] : false
            })
        }
    }
    const uncheckFieldForm=(event)=>{
        setimpactTracker({...impactTracker, [event.target.name]: ''})
    }

    const date = getDate()
    return (
        <>
        
            <div className="modal">
            <div className="grid grid-cols-1 justify-items-center pb-4 mt-8 md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto border border-blue-500 bg-white mb-8 rounded">
                <div className="grid grid-cols-1 gap-2">
                    <header id="banner-info-top shadow-xl ">
                        <div className='flex shadow-md justify-between rounded-lg p-4 m-5 items-center text-blue-500'>
                            <svg width="40" height="40" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7L12 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 17.01L12.01 16.9989" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <p className='w-4/5 text-blue-500 font-semibold'>
                                Please check wich of the following topics your client mentioned in your latest interaction.
                                If possible, specify if the client's situation improved, remained unchanged or worsened.
                                This will help us measure whether we are moving towards or away from our organization's impact goals.
                            </p>
                        </div>
                    </header> 
                    <div className='flex justify-between items-center font-bold mx-6 mb-5'>
                            <p className='text-xs'>Did the client mention any of the following:</p>
                            <div className='flex text-blue-500'>
                                <h5 className='mr-3'>Date</h5>
                                <p>{date}</p>
                            </div>
                    </div>   
                    <section className="">
                        <form className='w-full grid grid-cols-1 gap-3 mb-5'>
                             
                        <div id="medical-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.9 18H10.1C9.76863 18 9.5 17.7314 9.5 17.4V15.1C9.5 14.7686 9.23137 14.5 8.9 14.5H6.6C6.26863 14.5 6 14.2314 6 13.9V10.1C6 9.76863 6.26863 9.5 6.6 9.5H8.9C9.23137 9.5 9.5 9.23137 9.5 8.9V6.6C9.5 6.26863 9.76863 6 10.1 6H13.9C14.2314 6 14.5 6.26863 14.5 6.6V8.9C14.5 9.23137 14.7686 9.5 15.1 9.5H17.4C17.7314 9.5 18 9.76863 18 10.1V13.9C18 14.2314 17.7314 14.5 17.4 14.5H15.1C14.7686 14.5 14.5 14.7686 14.5 15.1V17.4C14.5 17.7314 14.2314 18 13.9 18Z" fill="#ffffff" stroke="#2278C9" strokeWidth="1.5"/>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"  stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <h5 className='font-bold pl-1'>Medical</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="barrierHIVPrimaryCare" onChange={uncheckFieldForm} checked={impactTracker.barrierHIVPrimaryCare? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Barriers to accessing HIV primary care</p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="barrierHIVPrimaryCare" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="barrierHIVPrimaryCare" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="barrierHIVPrimaryCare" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="barrierAccessingMedications" onChange={uncheckFieldForm} checked={impactTracker.barrierAccessingMedications? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Barriers to accessing medications  </p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="barrierAccessingMedications" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="barrierAccessingMedications" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="barrierAccessingMedications" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="medicationAdherence" onChange={uncheckFieldForm} checked={impactTracker.medicationAdherence? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Difficulty adhering to medication or treatment plan </p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="medicationAdherence" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="medicationAdherence" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="medicationAdherence" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue justify-start items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="barrierHIVPrimaryCare" onChange={uncheckFieldForm} checked={impactTracker.barrierHIVPrimaryCare? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs  ml-3 w-1/4 md:w-2/6 lg:w-5/12 xl:w-3/6'>Detectable viral load</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mr-2 md:mx-2 md:mr-3 lg:mx-4 xl:ml-0'>
                                                <input className="mr-1 md:mr-2" type="radio" 
                                                onChange={onValueChangeInputRadio} name="CD4ViralLoad" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-7 md:mx-3 lg:mr-4 xl:mx-6'>
                                                <input className="mx-1 md:mr-2" type="radio" 
                                                onChange={onValueChangeInputRadio} name="CD4ViralLoad" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>     
                                    </div>  
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="viralLoadCount" onChange={uncheckFieldForm} checked={impactTracker.viralLoadCount? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Viral Load Count </p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="viralLoadCount" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="viralLoadCount" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="viralLoadCount" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="CD4Count" onChange={uncheckFieldForm} checked={impactTracker.CD4Count? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>CD4 Count</p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="CD4Count" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="CD4Count" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="CD4Count" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="barrierHIVPrimaryCare" onChange={uncheckFieldForm} checked={impactTracker.barrierHIVPrimaryCare? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs  ml-3 w-1/4 md:w-2/6 lg:w-5/12 xl:w-3/6'>More than 6 months since last HIV test</p>
                                        <div className='text-xs flex justify-between'>
                                            <span className='mr-2 md:mx-2 md:mr-3 lg:mx-4 xl:ml-0'>
                                                <input className="mr-1 md:mr-2" type="radio" 
                                                onChange={onValueChangeInputRadio} name="CD4ViralLoad" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='mx-7 md:mx-3 lg:mr-4 xl:mx-6'>
                                                <input className="mr-1 md:mr-2" type="radio" 
                                                onChange={onValueChangeInputRadio} name="CD4ViralLoad" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>     
                                    </div>  
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="PrEP" onChange={uncheckFieldForm} checked={impactTracker.PrEP? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Uninformed about PrEP</p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="PrEP" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="PrEP" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="PrEP" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                </div>
                            </div>

                            
                            <div id="risky-behaviors-substance-abuse-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="#62A6E5" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.0429 21H3.95705C2.41902 21 1.45658 19.3364 2.22324 18.0031L10.2662 4.01533C11.0352 2.67792 12.9648 2.67791 13.7338 4.01532L21.7768 18.0031C22.5434 19.3364 21.581 21 20.0429 21Z" stroke="#62A6E5" strokeLinecap="round"/>
                                <path d="M12 9V13" stroke="#ffffff" strokeLinecap="round"/>
                                <path d="M12 17.01L12.01 16.9989" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                                    <h5 className='font-bold pl-1'>Risky Behaviors and Substance Abuse</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="unsafeSexualBehavior" onChange={uncheckFieldForm} checked={impactTracker.unsafeSexualBehavior? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Engaging in unsafe sexual behavior</p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="unsafeSexualBehavior" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="unsafeSexualBehavior" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="unsafeSexualBehavior" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="substanceAbuse" onChange={uncheckFieldForm} checked={impactTracker.substanceAbuse? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Substance abuse</p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="substanceAbuse" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="substanceAbuse" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="substanceAbuse" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="riskOfOverdose" onChange={uncheckFieldForm} checked={impactTracker.riskOfOverdose? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Fear of overdosing</p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="riskOfOverdose" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="riskOfOverdose" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="barrierHIVPrimaryCare" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                </div>
                            </div>


                            <div id="legal-financial-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9.5L12 4L21 9.5" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5 20H19" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 9L14 9" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 17L6 12" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 17L10 12" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 17L14 12" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18 17L18 12" stroke="#2278C9"  strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <h5 className='font-bold pl-1'>Legal and Financial</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="legalIssues" onChange={uncheckFieldForm} checked={impactTracker.legalIssues? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Legal Issues </p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="legalIssues" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="legalIssues" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="legalIssues" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="unstableEmployment" onChange={uncheckFieldForm} checked={impactTracker.unstableEmployment? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Unstable employment situation</p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="unstableEmployment" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="unstableEmployment" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="unstableEmployment" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                </div>
                            </div>

                            <div id="mental-health-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 20L21.8243 16.1757C21.9368 16.0632 22 15.9106 22 15.7515V10.5C22 9.67157 21.3284 9 20.5 9V9C19.6716 9 19 9.67157 19 10.5V15" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18 16L18.8581 15.1419C18.949 15.051 19 14.9278 19 14.7994V14.7994C19 14.6159 18.8963 14.4482 18.7322 14.3661L18.2893 14.1447C17.5194 13.7597 16.5894 13.9106 15.9807 14.5193L15.0858 15.4142C14.7107 15.7893 14.5 16.298 14.5 16.8284V20" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 20L2.17574 16.1757C2.06321 16.0632 2 15.9106 2 15.7515V10.5C2 9.67157 2.67157 9 3.5 9V9C4.32843 9 5 9.67157 5 10.5V15" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 16L5.14187 15.1419C5.05103 15.051 5 14.9278 5 14.7994V14.7994C5 14.6159 5.10366 14.4482 5.26776 14.3661L5.71067 14.1447C6.48064 13.7597 7.41059 13.9106 8.01931 14.5193L8.91421 15.4142C9.28929 15.7893 9.5 16.298 9.5 16.8284V20" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13.6667 12H10.3333V9.66667H8V6.33333H10.3333V4H13.6667V6.33333H16V9.66667H13.6667V12Z" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <h5 className='font-bold pl-1'>Mental Health</h5>
                                </div>
                                <div className='w-full bg-light-blue grid grid-cols-1'>
                                <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="mentalHealthIssues" onChange={uncheckFieldForm} checked={impactTracker.mentalHealthIssues? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Mental health issues</p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="mentalHealthIssues" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="mentalHealthIssues" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="mentalHealthIssues" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>  
                                </div>
                            </div>

                            <div id="housing-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.4 17H11.6C11.2686 17 11 16.7314 11 16.4V14.6C11 14.2686 11.2686 14 11.6 14H12.4C12.7314 14 13 14.2686 13 14.6V16.4C13 16.7314 12.7314 17 12.4 17Z" fill="#2278C9" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 9.5L12 4L21 9.5" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <h5 className='font-bold pl-1'>Housing</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="unstableHousing" onChange={uncheckFieldForm} checked={impactTracker.unstableHousing? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>An unstable housing situation</p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="unstableHousing" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="unstableHousing" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="unstableHousing" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div> 
                                </div>
                            </div>

                             <div id="food-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.1471 21.2646L12 21.2351L11.8529 21.2646C9.47627 21.7399 7.23257 21.4756 5.59352 20.1643C3.96312 18.86 2.75 16.374 2.75 12C2.75 7.52684 3.75792 5.70955 5.08541 5.04581C5.77977 4.69863 6.67771 4.59759 7.82028 4.72943C8.96149 4.86111 10.2783 5.21669 11.7628 5.71153L12.0235 5.79841L12.2785 5.69638C14.7602 4.70367 16.9909 4.3234 18.5578 5.05463C20.0271 5.7403 21.25 7.59326 21.25 12C21.25 16.374 20.0369 18.86 18.4065 20.1643C16.7674 21.4756 14.5237 21.7399 12.1471 21.2646Z" stroke="#2278C9" strokeWidth="1.5"/>
                                    <path d="M12 5.5C12 3 11 2 9 2" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 6V21" stroke="#2278C9" strokeWidth="1.5"/>
                                    <path d="M15 12L15 14" stroke="#2278C9" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <h5 className='font-bold pl-1'>Food</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="foodInsecurity" onChange={uncheckFieldForm} checked={impactTracker.foodInsecurity? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Food Insecurity</p>
                                        <div className='text-xs flex items-center justify-self-end'>
                                            <span className='mx-1'>
                                                <button className="p-1 px-2 font-semibold bg-pink-200 rounded-xs text-xs" type="button" 
                                                onClick={onValueChange} name="foodInsecurity" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-yellow-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="foodInsecurity" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='mx-1'>
                                            <button className="p-1 px-2 font-semibold bg-green-200 rounded-xs" type="button" 
                                                onClick={onValueChange} name="foodInsecurity" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>  
                                </div>
                            </div>

                           
                        </form>
                    </section>
                     
                </div>
                
                <button 
                    className='bg-dark-blue text-white rounded-sm flex items-center px-7 py-1 text-sm'>
                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12.5L10 15.5L17 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
        
                    Save</button>

            </div>
        </div>   
         
        </>
    );

};

export default impactTrackerModal;