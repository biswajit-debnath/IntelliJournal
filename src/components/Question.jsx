'use client'
import { askQuestion } from "@/utils/api";
import { useState } from "react";
import { Search, Loader2, MessageCircle } from "lucide-react";

const Question = () => {
    const [value, setValue] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!value.trim()) return;

        setAnswer("")
        setLoading(true);
        try {
            const response = await askQuestion(value);
            setAnswer(response);
        } catch (error) {
            setAnswer("Sorry, I couldn't find an answer to your question. Please try again.");
        }
        setLoading(false);
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Ask Your Journal</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            disabled={loading}
                            value={value}
                            onChange={handleOnChange}
                            type="text"
                            placeholder="Ask a question about your journal entries..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        />
                    </div>
                    <button
                        disabled={loading || !value.trim()}
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Search className="h-4 w-4" />
                        )}
                        <span>{loading ? 'Searching...' : 'Ask'}</span>
                    </button>
                </div>
            </form>

            {answer && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                        <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <h4 className="font-semibold text-blue-900 mb-2">Answer</h4>
                            <p className="text-blue-800 leading-relaxed">{answer}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Question;