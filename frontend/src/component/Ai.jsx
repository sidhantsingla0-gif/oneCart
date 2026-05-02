import React, { useContext, useEffect } from "react"
import ai from "../assets/ai.png"
import { useNavigate } from "react-router-dom"
import { shopDataContext } from "../context/ShopContext"
import { toast } from "react-toastify"
import open from "../assets/open.mp3"

function Ai() {
    let {showSearch, setShowSearch} = useContext(shopDataContext)
    let navigate = useNavigate()
    let [activeAi, setActiveAi] = React.useState(false)
    let openingSound = new Audio(open)

    function speak(message) {
        let utterance = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterance)
    }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  if(!recognition){
    console.log("not supported")
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim()
   if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch){
    speak("Opening search")
    setShowSearch(true)
    navigate("/collections")
   }
   else if((transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close")) && showSearch){
    speak("Closing search")
    setShowSearch(false)
   }
    else if(transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("products") || transcript.toLowerCase().includes("product")){
      speak("opening collections page")
      navigate("/collections")
    }
    else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage")){
      speak("opening about page")
      navigate("/about")
      setShowSearch(false)
    }
    else if(transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage")){
      speak("opening home page")
      navigate("/")
      setShowSearch(false)
    }
    else if(transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("caat") || transcript.toLowerCase().includes("kaart")){
      speak("opening cart")
      navigate("/cart")
      setShowSearch(false)
    }
    else if(transcript.toLowerCase().includes("contact") || transcript.toLowerCase().includes("contactpage")){
      speak("opening contact page")
      navigate("/contact")
      setShowSearch(false)
    }
    else if(transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("my order")){
      speak("opening orders page")
      navigate("/order")
      setShowSearch(false)
    }
    else{
        toast.error("Sorry, I didn't understand that. Please try again.")
      speak("Sorry, I didn't understand that. Please try again.")
    }
  }

  recognition.onend = () => {
    setActiveAi(false)
  }
  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={() =>{ recognition.start();
        openingSound.play()
        setActiveAi(true)
      }}
    >
      <img src={ai} alt="" className={`w-[100px] cursor-pointer ${activeAi ? 'translate-y-[-10px] translate-x-[-10px] scale-125' : 'translate-y-0 translate-x-0 scale-100'} transition-transform`} style={{filter:`${activeAi ? "drop-shadow(0px 0px 20px #00d2fc)":"drop-shadow(0px 0px 20px black)"}`}} />
    </div>
  )
}

export default Ai

