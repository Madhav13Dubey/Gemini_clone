import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context)

    // for print the history which is searched before back into the main file //
    const loadPrompt = async (prompt) => {
      setRecentPrompt(prompt)
      await onSent(prompt)
    } 

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="Menu Bar" />
        <div onClick={()=>newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended?<p>New Chat</p>:null}
        </div>
        {extended
          ? <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item,index)=>{
              return (
                  <div onClick={()=>loadPrompt(item)}className="recent-entry">
                       <img src={assets.message_icon} alt="Message Icon"/>
                       {/* Show 0 to 18 character in tab where history is stored i.e What is your name  has 17 words including space , so slice will display upto 18 character including space */}
                      <p>{item.slice(0,18)} ...</p>   
                  </div>
              )
            })}

        </div>
       : null
     }
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="Question Icon" />
            {extended?<p>Help</p>: null }
        </div>

        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="History Icon" />
            {extended?<p>Activity</p>: null}
        </div>

        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="Setting Icon" />
           {extended?<p>Setting</p>: null}

        </div>

      </div>
    </div>
  )
}

export default Sidebar
