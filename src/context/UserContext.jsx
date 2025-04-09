import React, { createContext, useState } from "react"
import run from "../gemini";
export const dataContext = createContext();

function UserContext({children}) {
    let [speaking, setSpeaking] = useState(false)
    let [dynamicText, setDynamicText] = useState("Listening...")
    let [responding, setResponding] = useState(false)

    function speak(text){
        let speech = new SpeechSynthesisUtterance(text)
        speech.volume = 1
        speech.rate = 1
        speech.pitch = 1
        speech.lang = "hi-US"
        window.speechSynthesis.speak(speech)
    }
    async function aiResponse(prompt){
        let response = await run(prompt)
        response = response.replace("**", "")
        response = response.replace("*", "")
        //response = response.replace("Google", "GSRK")&&response.replace("google", "GSRK")
        //let response = prompt
        setDynamicText(response)
        speak(response)
        setResponding(true)
        
        setTimeout(() => {
            setSpeaking(false)
            console.log("Set time out working")
            setResponding(false)
            setDynamicText("Listening...")
        }, (response.length)*100 + 2000);
    }

    let speechRecog = window.SpeechRecognition || window.webkitSpeechRecognition

    let recognition = new speechRecog()

    recognition.onresult=(e)=>{
        let currentIndex = e.resultIndex//feels unneccessary just use 0
        let transcript = e.results[currentIndex][0].transcript
        //console.log(e)
        //console.log(transcript)
        setDynamicText(transcript)
        aiResponse(transcript)
    }

    let val = {
        recognition, speaking, setSpeaking, dynamicText, responding
    }

  return (
    <div>
        <dataContext.Provider value={val}>
            {children}
        </dataContext.Provider>
    </div>
  )
}

export default UserContext
