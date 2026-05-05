import React, { useContext, useEffect, useState } from "react"
import ai from "../assets/ai.png"
import { useNavigate } from "react-router-dom"
import { shopDataContext } from "../context/ShopContext"
import { toast } from "react-toastify"

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext)
  const navigate = useNavigate()
  const [activeAi, setActiveAi] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const openingSound = new Audio("/open.mp3")

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.log("Speech recognition not supported")
      return
    }

    const recog = new SpeechRecognition()
    recog.continuous = false
    recog.interimResults = false

    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase()

      if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
        speak("Opening search")
        setShowSearch(true)
        navigate("/collections")
      } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
        speak("Closing search")
        setShowSearch(false)
      } else if (transcript.includes("collections") || transcript.includes("collection") || transcript.includes("products") || transcript.includes("product")) {
        speak("Opening collections page")
        navigate("/collections")
      } else if (transcript.includes("about")) {
        speak("Opening about page")
        navigate("/about")
        setShowSearch(false)
      } else if (transcript.includes("home")) {
        speak("Opening home page")
        navigate("/")
        setShowSearch(false)
      } else if (transcript.includes("cart") || transcript.includes("kaat") || transcript.includes("caat") || transcript.includes("kaart")) {
        speak("Opening cart")
        navigate("/cart")
        setShowSearch(false)
      } else if (transcript.includes("contact")) {
        speak("Opening contact page")
        navigate("/contact")
        setShowSearch(false)
      } else if (transcript.includes("orders") || transcript.includes("order")) {
        speak("Opening orders page")
        navigate("/order")
        setShowSearch(false)
      } else {
        toast.error("Sorry, I didn't understand that. Please try again.")
        speak("Sorry, I didn't understand that. Please try again.")
      }
    }

    recog.onstart = () => {
      setIsListening(true)
      setActiveAi(true)
    }

    recog.onend = () => {
      setIsListening(false)
      setActiveAi(false)
    }

    recog.onerror = (e) => {
      toast.error("Speech recognition error: " + e.error)
      setIsListening(false)
      setActiveAi(false)
    }

    setRecognition(recog)
  }, [navigate, setShowSearch, showSearch])

  const handleClick = () => {
    if (!recognition) {
      toast.error("Speech recognition not supported in this browser.")
      return
    }

    if (!isListening) {
      openingSound.play().catch(err => console.log("Audio play blocked:", err))
      recognition.start()
    } else {
      recognition.stop()
    }
  }

  return (
    <div
      role="button"
      aria-label="AI voice assistant"
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={handleClick}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`w-[100px] cursor-pointer ${
          activeAi
            ? "translate-y-[-10px] translate-x-[-10px] scale-125"
            : "translate-y-0 translate-x-0 scale-100"
        } transition-transform`}
        style={{
          filter: `${
            activeAi
              ? "drop-shadow(0px 0px 20px #00d2fc)"
              : "drop-shadow(0px 0px 20px black)"
          }`,
        }}
      />
    </div>
  )
}

export default Ai
