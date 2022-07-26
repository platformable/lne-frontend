import React, {useState} from 'react'
import {toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export function getDate () {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    const result = `${month}/${day}/${year}`
    return result
}

const ImpactTrackerModal = ({clientId,progress_note_id}) => {
    const router = useRouter()  
    const date = getDate()

    console.log("progress_note_id",progress_note_id)

    const [errorMessage, setErrorMessage] = useState('')
    const [impactTracker, setImpactTracker] = useState({
        clientId,
        progress_note_id,
        impactFormStartDate: date,
        barrierHIVPrimaryCare: null,
        // barrierAccessingMedications: null,
        // medicationAdherence: null,
        // CD4ViralLoad: null,
        viralLoadCount: null,
        CD4Count: null,
        // lastHIVTest: null,
        // PrEP: null,
        unsafeSexualBehavior: null,
        substanceAbuse: null,
        // riskOfOverdose: null,
        legalIssues: null,
        unstableEmployment: null,
        // mentalHealthIssues: null,
        unstableHousing: null,
        // foodInsecurity: null,
    })

    const createImpactTrackerForm =()=>{
        //when form is complete returns false
        const isEmpty = Object.values(impactTracker).some(value => !value)
                 
        if (!isEmpty) {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/impact_tracker`, {
                impactTracker
              })
              .then(function (response) {
                if(response.status===200 || response.statusText==='Ok'){
                  notifyMessage()
                  setTimeout(()=>{
                    router.push(`/clients/${clientId}/profile`)
                  },2300)
                 } 
              })
              .catch(function (error) {
                    setErrorMessage(error.message)
                    console.error("error: ", error.message)
              });
        } else {
            setErrorMessage('Must select all the options.')
        } 
        
    }
    const notifyMessage = () => {
        toast.success("Impact Tracker was saved!", {
          position: toast.POSITION.TOP_CENTER,
        });
    };
    const onValueChange=(event)=>{
        setImpactTracker({...impactTracker, [event.target.name]: event.target.value});
    }

    const enableFieldfromCheckbox=(event)=>{
        setImpactTracker({...impactTracker, [event.target.name]: ''})
    }


    return (
        <>

            <div className="modal">
            <div className="grid grid-cols-1 justify-items-center pb-4 mt-8 md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto border border-blue-500 bg-white mb-8 rounded">
                <div className="grid grid-cols-1 gap-2">
                    <header id="banner-info-top shadow-xl ">
                        <div className='flex shadow-md justify-around rounded-lg p-4 m-5 items-center text-blue-500'>
                            <svg width="40" height="40" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7L12 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 17.01L12.01 16.9989" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <p className='w-4/5 text-xs text-blue-500 font-semibold text-justify leading-tight'>
                                Please check which of the following topics were mentioned by your client in your
                                 latest interaction. If possible, please specify if their situation worsened, remained unchanged, or improved.
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
                            <div className="flex justify-between">
                                <div className='flex pl-5 items-center'>
                                    <img src="/impact_tracker/Medical_icon.svg" alt="medical section" width={21}/>
                                    
                                    <h5 className='font-bold pl-1'>Medical</h5>
                                </div>
                                <div className='flex pr-4 w-7/12 items-center'>
                                    <img src="/impact_tracker/Client_situation_changes_icon.svg" alt='client situation change section' width={21}/>

                                    <h5 className='font-bold pl-1 text-xs'>How has the client`s situation changed?</h5>
                                </div>
                            </div>
                                
                                <div className='w-full grid grid-cols-1 gap-1'>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                             <input type='checkbox' name="barrierHIVPrimaryCare" onChange={enableFieldfromCheckbox} checked={impactTracker.barrierHIVPrimaryCare !== null? true : false}/> 
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Barriers to accessing HIV primary care</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.barrierHIVPrimaryCare === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-pink-200 rounded-md hover:contrast-125 " 
                                                 type="button" style={impactTracker.barrierHIVPrimaryCare === 'Worsened'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="barrierHIVPrimaryCare" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-yellow-200 rounded-md hover:contrast-125 " type="button" 
                                                 style={impactTracker.barrierHIVPrimaryCare === 'Unchanged'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="barrierHIVPrimaryCare" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125 " type="button" 
                                                 style={impactTracker.barrierHIVPrimaryCare === 'Improved'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="barrierHIVPrimaryCare" value="Improved">Improved</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125 " type="button" 
                                                 style={impactTracker.barrierHIVPrimaryCare === 'N/A'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="barrierHIVPrimaryCare" value="N/A">Not applicable</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    {/* <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="barrierAccessingMedications" onChange={enableFieldfromCheckbox} checked={impactTracker.barrierAccessingMedications !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Barriers to accessing medications  </p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.barrierHIVPrimaryCare === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-pink-200 rounded-md hover:contrast-125" type="button" 
                                                style={impactTracker.barrierAccessingMedications === 'Worsened'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="barrierAccessingMedications" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-yellow-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.barrierAccessingMedications === 'Unchanged'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="barrierAccessingMedications" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.barrierAccessingMedications === 'Improved'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="barrierAccessingMedications" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div> */}
                                    
                                    {/* <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="medicationAdherence" onChange={enableFieldfromCheckbox} checked={impactTracker.medicationAdherence !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Difficulty adhering to medication or treatment plan </p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.barrierHIVPrimaryCare === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-pink-200 rounded-md hover:contrast-125" type="button" 
                                                style={impactTracker.medicationAdherence === 'Worsened'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="medicationAdherence" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-yellow-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.medicationAdherence === 'Unchanged'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="medicationAdherence" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.medicationAdherence === 'Improved'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="medicationAdherence" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue justify-start items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="CD4ViralLoad" onChange={enableFieldfromCheckbox} checked={impactTracker.CD4ViralLoad !== null !== null ? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs  ml-3 w-1/4 md:w-2/6 lg:w-5/12 xl:w-3/6'>Detectable viral load</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.barrierHIVPrimaryCare === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mr-2 md:mx-2 md:mr-3 lg:mx-4 xl:ml-0'>
                                                <input className="mr-1 md:mr-2" type="radio" 
                                                onChange={onValueChange} name="CD4ViralLoad" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='flex items-center mx-7 md:mx-3 lg:mr-4 xl:mx-6'>
                                                <input className="mx-1 md:mr-2" type="radio" 
                                                onChange={onValueChange} name="CD4ViralLoad" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>     
                                    </div>  */}
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3"> 
                                        <span>
                                            <input type='checkbox' name="CD4Count" onChange={enableFieldfromCheckbox} checked={impactTracker.CD4Count !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>CD4 Count</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 place-center ${impactTracker.CD4Count === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <input className="p-1 px-2 text-xxs flex items-center mr-1 md:mr-2 font-semibold bg-pink-200 rounded-md hover:contrast-125" type="radio" 
                                                style={impactTracker.CD4Count === '<100'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="CD4Count" value="<100" />
                                                <label>{`<100`}</label>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <input className="p-1 px-2 text-xxs flex items-center mr-1 md:mr-2 font-semibold bg-yellow-200 rounded-md hover:contrast-125" type="radio" 
                                                 style={impactTracker.CD4Count === '100-500'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="CD4Count" value="100-500"/>
                                                 <label>100-500</label>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <input className="p-1 px-2 text-xxs flex items-center mr-1 md:mr-2 font-semibold bg-green-200 rounded-md hover:contrast-125" type="radio" 
                                                 style={impactTracker.CD4Count === '+500'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="CD4Count" value="500+"/>
                                                 <label>+500</label>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <input className="p-1 px-2 text-xxs flex items-center mr-1 md:mr-2 font-semibold bg-green-200 rounded-md hover:contrast-125" type="radio" 
                                                 style={impactTracker.CD4Count === 'N/A'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="CD4Count" value="N/A"/>
                                                 <label>N/A</label>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="viralLoadCount" onChange={enableFieldfromCheckbox} checked={impactTracker.viralLoadCount !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Viral Load Count</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.viralLoadCount === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <input className="p-1 px-2 text-xxs flex items-center mr-1 md:mr-2 font-semibold bg-pink-200 rounded-md hover:contrast-125" type="radio" 
                                                style={impactTracker.viralLoadCount === '<50'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="viralLoadCount" value="<50"/>
                                                <label>{`<50`}</label>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <input className="p-1 px-2 text-xxs flex items-center mr-1 md:mr-2 font-semibold bg-yellow-200 rounded-md hover:contrast-125" type="radio" 
                                                 style={impactTracker.viralLoadCount === '50+'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="viralLoadCount" value="50+"/>
                                                 <label>50+</label>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <input className="p-1 px-2 text-xxs flex items-center mr-1 md:mr-2 font-semibold bg-green-200 rounded-md hover:contrast-125" type="radio" 
                                                 style={impactTracker.viralLoadCount === 'Improved'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="viralLoadCount" value="N/A"/>
                                                 <label>N/A</label>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    {/* <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="lastHIVTest" onChange={enableFieldfromCheckbox} checked={impactTracker.lastHIVTest !== null !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs  ml-3 w-1/4 md:w-2/6 lg:w-5/12 xl:w-3/6'>More than 6 months since last HIV test</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.barrierHIVPrimaryCare === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mr-2 md:mx-2 md:mr-3 lg:mx-4 xl:ml-0'>
                                                <input className="mr-1 md:mr-2" type="radio" 
                                                onChange={onValueChange} name="lastHIVTest" value={true} />
                                                <label>Yes</label>
                                            </span>
                                            <span className='flex items-center mx-7 md:mx-3 lg:mr-4 xl:mx-6'>
                                                <input className="mr-1 md:mr-2" type="radio" 
                                                onChange={onValueChange} name="lastHIVTest" value={false} />
                                                <label>No</label>
                                            </span>
                                        </div>     
                                    </div>  
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="PrEP" onChange={enableFieldfromCheckbox} checked={impactTracker.PrEP !== null !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Knows about PrEP and how to access it</p>
                                            <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.barrierHIVPrimaryCare === null ? "pointer-events-none grayscale": ""}`}>
                                                <span className='flex items-center mr-2 md:mx-2 md:mr-3 lg:mx-4 xl:ml-0'>
                                                    <input className="mr-1 md:mr-2" type="radio" 
                                                    onChange={onValueChange} name="PrEP" value={true} />
                                                    <label>Yes</label>
                                                </span>
                                                <span className='flex items-center mx-7 md:mx-3 lg:mr-4 xl:mx-6'>
                                                    <input className="mr-1 md:mr-2" type="radio" 
                                                    onChange={onValueChange} name="PrEP" value={false} />
                                                    <label>No</label>
                                                </span>
                                             </div>   
                                    </div> */}
                                </div>
                            </div>

                            
                            <div id="risky-behaviors-substance-abuse-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                <img src="/impact_tracker/Risky_icon.svg" alt="riky behaviors section" width={21}/>
                                

                                    <h5 className='font-bold pl-1'>Risky Behaviors and Substance Use</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="unsafeSexualBehavior" onChange={enableFieldfromCheckbox} checked={impactTracker.unsafeSexualBehavior !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6 mr-2'>Engaging in unsafe sexual behavior</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.unsafeSexualBehavior === null ? "pointer-events-none grayscale": ""}`}>
                                                <span className='flex items-center mr-2 md:mx-2 md:mr-3 lg:mx-4 xl:ml-0'>
                                                    <input className="mr-1 md:mr-2" type="radio" 
                                                    onChange={onValueChange} name="unsafeSexualBehavior" value="true" />
                                                    <label>Yes</label>
                                                </span>
                                                <span className='flex items-center'>
                                                    <input className="mr-1 md:mr-2" type="radio" 
                                                    onChange={onValueChange} name="unsafeSexualBehavior" value="false" />
                                                    <label>No</label>
                                                </span>
                                                <span className='flex items-center'>
                                                    <input className="mr-1 md:mr-2" type="radio" 
                                                    onChange={onValueChange} name="unsafeSexualBehavior" value="N/A" />
                                                    <label>N/A</label>
                                                </span>
                                        </div>      
                                    </div>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="substanceAbuse" onChange={enableFieldfromCheckbox} checked={impactTracker.substanceAbuse !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Problems with substance use</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.substanceAbuse === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-pink-200 rounded-md hover:contrast-125" type="button" 
                                                style={impactTracker.substanceAbuse === 'Worsened'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="substanceAbuse" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-yellow-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.substanceAbuse === 'Unchanged'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="substanceAbuse" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.substanceAbuse === 'Improved'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="substanceAbuse" value="Improved">Improved</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.substanceAbuse === 'N/A'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="substanceAbuse" value="N/A">Not applicable</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    {/* <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="riskOfOverdose" onChange={enableFieldfromCheckbox} checked={impactTracker.riskOfOverdose !== null !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Fear of overdosing</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.barrierHIVPrimaryCare === null ? "pointer-events-none grayscale": ""}`}>
                                                <span className='flex items-center mr-2 md:mx-2 md:mr-3 lg:mx-4 xl:ml-0'>
                                                    <input className="mr-1 md:mr-2" type="radio" 
                                                    onChange={onValueChange} name="riskOfOverdose" value={true} />
                                                    <label>Yes</label>
                                                </span>
                                                <span className='flex items-center mx-7 md:mx-3 lg:mr-4 xl:mx-6'>
                                                    <input className="mr-1 md:mr-2" type="radio" 
                                                    onChange={onValueChange} name="riskOfOverdose" value={false} />
                                                    <label>No</label>
                                                </span>
                                        </div>   
                                    </div> */}
                                </div>
                            </div>


                            <div id="legal-financial-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                <img src="/impact_tracker/Legal_and_Financial_icon.svg" alt="legal and financial section" width={21}/>

                                    <h5 className='font-bold pl-1'>Legal and Financial</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="legalIssues" onChange={enableFieldfromCheckbox} checked={impactTracker.legalIssues !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Legal issues </p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.legalIssues === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-pink-200 rounded-md hover:contrast-125" type="button" 
                                                style={impactTracker.legalIssues === 'Worsened'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="legalIssues" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-yellow-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.legalIssues === 'Unchanged'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="legalIssues" value="Unchanged">Unchanged</button>
                                            </span>
                                            
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.legalIssues === 'Improved'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="legalIssues" value="Improved">Improved</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.legalIssues === 'N/A'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="legalIssues" value="N/A">Not applicable</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                    <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="unstableEmployment" onChange={enableFieldfromCheckbox} checked={impactTracker.unstableEmployment !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Unstable employment situation</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.unstableEmployment === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-pink-200 rounded-md hover:contrast-125" type="button" 
                                                style={impactTracker.unstableEmployment === 'Worsened'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="unstableEmployment" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-yellow-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.unstableEmployment === 'Unchanged'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="unstableEmployment" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.unstableEmployment === 'Improved'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="unstableEmployment" value="Improved">Improved</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.unstableEmployment === 'N/A'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="unstableEmployment" value="N/A">Not applicable</button>
                                            </span>
                                            
                                        </div>   
                                    </div>
                                </div>
                            </div>

                            {/* <div id="mental-health-section" className='grid grid-cols-1 gap-2'>
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
                                            <input type='checkbox' name="mentalHealthIssues" onChange={enableFieldfromCheckbox} checked={impactTracker.mentalHealthIssues !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Mental health issues</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.barrierHIVPrimaryCare === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-pink-200 rounded-md hover:contrast-125" type="button" 
                                                style={impactTracker.mentalHealthIssues === 'Worsened'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="mentalHealthIssues" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-yellow-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.mentalHealthIssues === 'Unchanged'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="mentalHealthIssues" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.mentalHealthIssues === 'Improved'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="mentalHealthIssues" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>  
                                </div>
                            </div> */}

                            <div id="housing-section" className='grid grid-cols-1 gap-2'>
                                <div className='flex pl-5 items-center'>
                                    <img src="/impact_tracker/Housing_icon.svg" alt="housing section" width={21}/>
                                    

                                    <h5 className='font-bold pl-1'>Housing</h5>
                                </div>
                                <div className='w-full grid grid-cols-1 gap-1'>
                                <div className="flex bg-light-blue items-center py-1 pl-6 pr-3">
                                        <span>
                                            <input type='checkbox' name="unstableHousing" onChange={enableFieldfromCheckbox} checked={impactTracker.unstableHousing !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>An unstable housing situation</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.unstableHousing === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-pink-200 rounded-md hover:contrast-125" type="button" 
                                                style={impactTracker.unstableHousing === 'Worsened'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="unstableHousing" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-yellow-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.unstableHousing === 'Unchanged'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="unstableHousing" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.unstableHousing === 'Improved'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="unstableHousing" value="Improved">Improved</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.unstableHousing === 'N/A'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="unstableHousing" value="N/A">Not applicable</button>
                                            </span>
                                            
                                        </div>   
                                    </div> 
                                </div>
                            </div>

                             {/* <div id="food-section" className='grid grid-cols-1 gap-2'>
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
                                            <input type='checkbox' name="foodInsecurity" onChange={enableFieldfromCheckbox} checked={impactTracker.foodInsecurity !== null? true : false}></input>
                                        </span>
                                        <p className='font-bold text-xs ml-3 w-3/6'>Food Insecurity</p>
                                        <div className={`text-xs grid w-11/12 grid-cols-4 ${impactTracker.barrierHIVPrimaryCare === null ? "pointer-events-none grayscale": ""}`}>
                                            <span className='flex items-center mx-1'>
                                                <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-pink-200 rounded-md hover:contrast-125" type="button" 
                                                style={impactTracker.foodInsecurity === 'Worsened'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                onClick={onValueChange} name="foodInsecurity" value="Worsened">Worsened</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-yellow-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.foodInsecurity === 'Unchanged'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="foodInsecurity" value="Unchanged">Unchanged</button>
                                            </span>
                                            <span className='flex items-center mx-1'>
                                            <button className="p-1 px-2 text-xxs flex items-center font-semibold bg-green-200 rounded-md hover:contrast-125" type="button" 
                                                 style={impactTracker.foodInsecurity === 'Improved'? {border: '2px solid lightblue', filter: 'saturate(2.5)'}:null}
                                                 onClick={onValueChange} name="foodInsecurity" value="Improved">Improved</button>
                                            </span>
                                            
                                        </div>   
                                    </div>  
                                </div>
                            </div> */}

                           
                        </form>
                    </section>
                     
                </div>
                
                <button 
                    onClick={createImpactTrackerForm}
                    className='bg-dark-blue text-white rounded-sm flex items-center px-7 py-1 text-sm'>
                    <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24"  fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12.5L10 15.5L17 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
        
                    Save</button>
                    {errorMessage && (<p className='mt-2 px-5 py-1 font-semibold border border-red-300 rounded-md text-red-600 text-lg'>{errorMessage}</p>)}

            </div>
        </div>   
         
        </>
    );

};

export default ImpactTrackerModal;