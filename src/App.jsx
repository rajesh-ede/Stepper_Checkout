
import { Component } from 'react'
import './App.css'
import CheckoutStepper from './Components/CheckoutStepper'

function App() {

  const CHECK_OUT = [
    {
      name: "Customer Info",
      Component: () => <div>Provide Customer details.</div>
    },
    {
      name:"Shipping Info",
      Component:() => <div>Enter your Shipping Address.</div>
    },
    {
      name:"Payment",
      Component:()=> < div>Complete the Payment for your Order</div>
    },
    {
      name:"Delivery",
      Component:()=><div>Your Order will delivered Successfully.</div>
    }
  ]

  return (
    <>
      <div>
        <h2>Check_Out</h2>
        <CheckoutStepper stepConfig={CHECK_OUT} />
      </div>
    </>
  )
}

export default App
