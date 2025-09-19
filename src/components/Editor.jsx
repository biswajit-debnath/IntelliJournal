'use client';

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({entry}) => { 
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true);
            const updatedEntry = await updateEntry(entry.id, _value);
            setIsLoading(false);
        }
    })

    return (
        <div className="h-full w-full">
            {isLoading && <div>Loading.....</div>}
            <textarea 
                className="text-xl p-8 w-full h-full outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
        </div>
    )
}

export default Editor;