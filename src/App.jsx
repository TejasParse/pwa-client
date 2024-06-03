import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import CKEditor1 from './Components/CKeditor'
import Quill from './Components/Quill'
import Tiny from './Components/Tiny'
import Lexical from './Components/Lexical'
import DrawSignature from './Components/DrawSignature'
import DrawLibrary from './Components/DrawLibrary'
import DraggingComponents from './Components/Draggable'
import DnDKit from './Components/DnDKit'
import WordClone from './Components/WordClone'

import subscribeUserToPush from './subscribeToPush';

function App() {

  useEffect(() => {
    async function subscribe() {
      const registration = await navigator.serviceWorker.ready;
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        subscribeUserToPush(registration);
      } else {
        console.error('Permission not granted for notifications');
      }
    }

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      subscribe();
    }
  }, []);

  const [editorType, seteditorType] = useState("left")


  return (
    <div>
      <div>
        <button className='btn btn-primary' onClick={() => seteditorType("left")}>Left CKEditor</button>
        <button className='btn btn-primary' onClick={() => seteditorType("middle")}>Middle Quill</button>
        <button className='btn btn-primary' onClick={() => seteditorType("right")}>Right Tiny</button>
        <button className='btn btn-primary' onClick={() => seteditorType("lexical")}>Convert Docx to HTML</button>
        <button className='btn btn-primary' onClick={() => seteditorType("draw")}>Draw Signature</button>
        <button className='btn btn-primary' onClick={() => seteditorType("drawLib")}>Draw Library</button>
        <button className='btn btn-primary' onClick={() => seteditorType("drag")}>Drag Library</button>
        <button className='btn btn-primary' onClick={() => seteditorType("dndkit")}>DnDKit</button>
        <button className='btn btn-primary' onClick={() => seteditorType("wordclone")}>WordClone</button>
      </div>
      <div>
        {
          editorType === "left" && (
            <CKEditor1></CKEditor1>
          )
        }
        {
          editorType === "middle" && (
            <Quill></Quill>
          )
        }
        {
          editorType === "right" && (
            <Tiny></Tiny>
          )
        }
        {
          editorType === "lexical" && (
            <Lexical></Lexical>
          )
        }
        {
          editorType === "draw" && (
            <DrawSignature></DrawSignature>
          )
        }
        {
          editorType === "drawLib" && (
            <DrawLibrary></DrawLibrary>
          )
        }
        {
          editorType === "drag" && (
            <DraggingComponents></DraggingComponents>
          )
        }
        {
          editorType === "dndkit" && (
            <DnDKit></DnDKit>
          )
        }
        {
          editorType === "wordclone" && (
            <WordClone></WordClone>
          )
        }

      </div>
    </div>
  )
}

export default App
