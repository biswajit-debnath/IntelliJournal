'use client'
import { askQuestion } from "@/utils/api";
import { useState } from "react";

const Question = () => {
    const [value, setValue] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setAnswer("")
        setLoading(true);
        const response = await askQuestion(value);
        setAnswer(response);
        setLoading(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    disabled={loading}
                    value={value} 
                    onChange={handleOnChange} 
                    type="text"
                    placeholder="Ask a question"
                    className="px-8 py-3 border border-black/20 text-lg rounded-lg bg-white"
                />
                <button 
                    disabled={loading}
                    type="submit" 
                    className="px-6 py-4 ml-2 rounded-lg bg-blue-400"
                >
                    Ask
                </button>
            </form>
            {loading && <div>....Loading</div>}
            {answer && <div>{answer}</div>}
        </div>
    )
}


export default Question;