import React, { useContext } from 'react'
import "./App.css"
import ai_img from "/ai.png"
import { IoMdMic } from "react-icons/io";
import { dataContext } from './context/UserContext';
import speakLoadImg from "/speak.gif"
import responseImg from "/aiVoice.gif"

function App() {

  let {recognition, speaking, setSpeaking, dynamicText, responding} = useContext(dataContext)
  // const handleClick = () => {
  //   speak("नमस्ते"); // Changed to Hindi for the specified language
  // };
  // document.addEventListener('click', handleClick)

  return (
    
    <div className="main">
      {(dynamicText === "Listening...")?
        <>
        <img src={ai_img} alt="image of advance AI" id = "ai_img"/>
        <span id="ai_tagline">Ask me ANYTHING, I am here to Help.</span>
        </>
        : null
      }

      {!speaking ? <button id="ask_button" onClick={()=>{
        setSpeaking(true)
        recognition.start()
      }}><IoMdMic /></button>
      :
      <>
        {!responding ? <img src={speakLoadImg} alt="loading" id = "speakLoadImg"/>
        : <img src={responseImg} alt="ai responding" id ="responseImg"/>
        }
        <p id="transcription_text">{dynamicText}</p>
      </>
      }
      
    </div>
  )
}

export default App
