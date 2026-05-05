import React, { useEffect, useState } from "react"

function VoiceTest() {
  const [recognition, setRecognition] = useState(null)
  const [transcript, setTranscript] = useState("")
  const [listening, setListening] = useState(false)

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.log("Speech recognition not supported")
      return
    }

    const recog = new SpeechRecognition()
    recog.continuous = true
    recog.interimResults = true

    recog.onresult = (e) => {
      const text = Array.from(e.results)
        .map(r => r[0].transcript)
        .join("")
      setTranscript(text)
    }

    recog.onstart = () => setListening(true)
    recog.onend = () => setListening(false)
    recog.onerror = (e) => console.error("Error:", e)

    setRecognition(recog)
  }, [])

  const handleClick = () => {
    if (recognition && !listening) {
      recognition.start()
    } else if (recognition && listening) {
      recognition.stop()
    }
  }

  return (
    <div>
      <button onClick={handleClick}>
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  )
}

export default VoiceTest
