"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import toast from "react-hot-toast";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const updatedJournal = await updateEntry(entry.id, _value);

      if (updatedJournal.limitExceeded) {
        toast.error(
          "AI API limit exceeded. Entry saved without analysis. Please ask admin for increase."
        );
      } else if (updatedJournal.analysis) {
        setAnalysis(updatedJournal.analysis);
      }

      setIsLoading(false);
    },
  });

  const { summery, subject, mood, negative, color } = analysis || {};
  const analysisDataStructure = [
    { name: "Summery", value: summery || "N/A" },
    { name: "Subject", value: subject || "N/A" },
    { name: "Mood", value: mood || "N/A" },
    {
      name: "Negative",
      value: negative !== undefined ? (negative ? "True" : "False") : "N/A",
    },
  ];

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>Loading.....</div>}
        <textarea
          className="text-xl p-8 w-full h-full outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border-l border-black/10">
        <div
          className="px-6 py-10"
          style={{ backgroundColor: color || "#f0f0f0" }}
        >
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisDataStructure.map((item) => (
              <li
                key={item.name}
                className="px-4 py-6 flex justify-between border-b border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
