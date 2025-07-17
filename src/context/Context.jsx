import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    // creating the typing effect (by creating delayPara as state variable) due ro which the result comes acording to your typing answer 
    // ** -> for that we made that word in bold and for * -> we made a next line means separating of the line 
    const delayPara = (index,nextWord) =>{
        setTimeout(function() {
            setResultData(prev=>prev+nextWord)     
        }, 75*index)
    }

    // Creating function for new Chat // 
    // after executing this function (newChat) , result screen will be hidden and greet and card section will be visible //

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }
    const onSent = async (prompt) => {

            setResultData("")
            setLoading(true)
            setShowResult(true)
            let response;
            if (prompt !== undefined) {
                response = await run(prompt);
                setRecentPrompt(prompt)
            }
            else {
                setPrevPrompts(prev=>[...prev,input])  // used to add prev prompt in the recent and store them as history
                setRecentPrompt(input)
                response = await run(input)
            }
            let responseArray = response.split("**");
            let newResponse=" ";  // to avoid the problem of undefined that is always written while doing search, we will initialize with an empty string i.e. " " //
        
            // for double star 
            for(let i=0;i< responseArray.length;i++)
            {
                if (i == 0 || i%2 !== 1){
                    newResponse += responseArray[i];
            }
             else {
                newResponse += "<b>"+responseArray[i]+"</b>";
            }   
        }
        // single star

        let newResponse2 = newResponse.split("*").join("</br>")
           // setResultData(newResponse2)
           let newResponseArray = newResponse2.split(" ");
           for(let i=0; i<newResponseArray.length; i++)
           {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
           }
            setLoading(false)
            setInput("")
        }

    
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider



// 1 state is used to save the input data 
// when we click on the sent button then, in 2 state :-  the input data present in 1 state get stored in the recentPrompts and 
// displayed into the main component

// 3 state is used as an array which is used to stored the i/p history & displayed in the recent tab
// when 4 state becomes true it hides all the four cards that are present in the home page of clone and display the result
// when 5 state becomes true , it will display the loading animation and after getting the data we will make it false 
// 6 state is used to display the result on  our web page