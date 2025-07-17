import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon}alt="User Icon"/>
        </div>
      <div className="main-container">

        {!showResult
        ?<>

            <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can i assist you today ?</p>
        </div>
        <div className="cards">
            <div className="card">
                <a href="https://www.voyajo.com/?utm_source=Bing&utm_medium=CPC&utm_term=best%20road%20trips&utm_campaign=Search&msclkid=6f48ec87d8581f82f7f08bd5176cd94f" target="_blank">Suggest beautiful places to see on an upcoming road trip</a>
                <img src={assets.compass_icon} alt="Compass Icon"/>
            </div>

            <div className="card">
                {/* <p>Briefly summarize this concept: urban planning</p> */}
                <a href="https://www.re-thinkingthefuture.com/know-your-architects/a3380-10-conceptual-urban-planning-theories-by-famous-architects/" target="_blank">Briefly summarize this concept: urban planning</a>
                <img src={assets.message_icon} alt="Message Icon"/>
            </div>

            <div className="card">
                <a href="https://professional.dce.harvard.edu/blog/10-tips-for-improving-your-public-speaking-skills/" target="_blank">What are the best tips to improve my public speaking skills</a>
                <img src={assets.bulb_icon} alt="Bulb Icon"/>
            </div>

            <div className="card">
                <a href="https://dzone.com/articles/10-tips-how-to-improve-the-readability-of-your-sof" target="_blank">How to improve the readability of the code </a>
                <img src={assets.code_icon} alt="Code Icon"/>
            </div>
        </div>
        </>
        :<div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="User Icon" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="Gemini Icon"/>
                {/* when the result is not displayig till then loader wil form  */}
                
                {loading
                ?<div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                </div>
                : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }

            </div>
        </div>
        }
        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value = {input} type="text" placeholder='Enter the message here'/>
                <div>
                    <img src={assets.gallery_icon} alt="Gallery Icon" />
                    <img src={assets.mic_icon} alt="Microphone Icon" />
                    {input?<img onClick={()=>onSent()}src={assets.send_icon} alt="Send Icon" />:null}
                </div>
            </div>
            <p className="bottom-info">
                Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
            </p>
        </div>
      </div>
    </div>
  )
}

export default Main
