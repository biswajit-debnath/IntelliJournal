"use client";
import { askQuestion } from "@/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";

const Question = () => {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer("");
    setLoading(true);
    const response = await askQuestion(value);
    if (response.limitExceeded) {
      toast.error(
        "AI API limit exceeded. Could not get answer to your question. Please ask admin for increase."
      );
      setLoading(false);
      return;
    }
    setAnswer(response.data);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          value={value}
          onChange={handleOnChange}
          type="text"
          placeholder="Ask a question about your journals"
          className="px-2 py-3 border border-black/20 text-lg rounded-lg bg-white"
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
  );
};

export default Question;
