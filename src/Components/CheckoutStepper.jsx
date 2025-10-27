import React, { useEffect, useRef, useState } from 'react'
import "../App.css";
const CheckoutStepper = ({stepConfig = []}) => {
    const [currentstep, setCurrentstep] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);
    const stepRef = useRef([]);
    const [margins, setMargins] = useState({
        marginLeft:0,
        marginRight:0,
    });

    useEffect(() => {
      setMargins({
        marginLeft:stepRef.current[0].offsetWidth / 2,
        marginRight:stepRef.current[stepConfig.length-1].offsetWidth / 2,
      })
    },[stepRef,stepConfig.length])

    if(!stepConfig.length){
        <></>;
    }
   const handleprev = () =>{
    if(currentstep > 1) setCurrentstep((prev) => prev - 1);
   }

    const handleNext = () => {
        setCurrentstep(prevStep =>{
            if(prevStep === stepConfig.length){
                setIsCompleted(true)
                return prevStep;
            }else{
                return  prevStep+1
            }
        })
    }
  const calculateProgressBarWidth = () => {
    return ((currentstep-1) / (stepConfig.length-1)) * 100;
  }
    const ActiveComponent = stepConfig[currentstep-1]?.Component;
  return (
    <>
    <div className='stepper'>
        {stepConfig.map((step,index) => {
            return(
                 <div key={step.name} 
                 ref={(el) => (stepRef.current[index] = el)}
                 className={`step ${
                    currentstep > index +1 || isCompleted ? "complete":""
                 } ${currentstep === index+1 ? "active" : ""}`}>
                <div className='step-number'>
                    { currentstep > index +1 || isCompleted ? (<span>&#10003;</span>) : (index+1)}
                    </div>
                <div className='step-name'>{step.name}</div>
                </div>
            );
        })}
        <div className="progress-bar" style={{ width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
        marginLeft:margins.marginLeft,
        marginRight:margins.marginRight,
    }}>
            <div className="progress" style={{width:`${calculateProgressBarWidth()}%`}}></div>
        </div>
    </div>
      <ActiveComponent />
      <div className='btn-container'>
     {currentstep > 1 && !isCompleted &&(<button className='btn-prev' onClick={handleprev}>Previous</button>)}
    {!isCompleted &&(<button className='btn-next' onClick={handleNext}>{ currentstep === stepConfig.length ? "Finish" :"Next"}</button>)}
    </div>
    </>
  )
}

export default CheckoutStepper 