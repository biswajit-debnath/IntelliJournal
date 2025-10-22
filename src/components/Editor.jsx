'use client';

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import { 
    BookOpen, 
    Smile, 
    Tag, 
    FileText, 
    AlertTriangle,
    Loader2,
    CheckCircle,
    XCircle
} from "lucide-react";

const Editor = ({entry}) => { 
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(entry.analysis);
    const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true);
            setSaveStatus('saving');
            try {
                const updatedJournal = await updateEntry(entry.id, _value);
                setAnalysis(updatedJournal.analysis);
                setSaveStatus('saved');
            } catch (error) {
                setSaveStatus('error');
                console.error('Failed to save:', error);
            }
            setIsLoading(false);
        }
    })

    const {summery, subject, mood, negative, color} = analysis;
    const analysisDataStructure = [
        {name: "Summary", value: summery, icon: FileText, color: "text-blue-600"},
        {name: "Subject", value: subject, icon: Tag, color: "text-green-600"},
        {name: "Mood", value: mood, icon: Smile, color: "text-purple-600"},
        {name: "Sentiment", value: negative ? "Negative" : "Positive", icon: negative ? AlertTriangle : CheckCircle, color: negative ? "text-red-600" : "text-emerald-600"}
    ]

    return (
        <div className="h-full w-full flex flex-col lg:flex-row bg-gray-50">
            {/* Editor Section */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <BookOpen className="h-6 w-6 text-gray-600" />
                        <h1 className="text-xl font-semibold text-gray-900">Journal Entry</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        {saveStatus === 'saving' && (
                            <div className="flex items-center space-x-2 text-blue-600">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm">Saving...</span>
                            </div>
                        )}
                        {saveStatus === 'saved' && (
                            <div className="flex items-center space-x-2 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm">Saved</span>
                            </div>
                        )}
                        {saveStatus === 'error' && (
                            <div className="flex items-center space-x-2 text-red-600">
                                <XCircle className="h-4 w-4" />
                                <span className="text-sm">Save failed</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Editor */}
                <div className="flex-1 p-6">
                    <textarea 
                        className="w-full h-full resize-none bg-white border-0 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg leading-relaxed p-6 placeholder-gray-400 transition-all duration-200"
                        placeholder="Start writing your thoughts..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        style={{
                            minHeight: '100%',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                    />
                </div>
            </div>

            {/* Analysis Panel */}
            <div className="w-full lg:w-96 bg-white border-l border-gray-200 flex flex-col">
                {/* Analysis Header */}
                <div 
                    className="px-6 py-6 text-white relative overflow-hidden"
                    style={{backgroundColor: color || '#6366f1'}}
                >
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative">
                        <h2 className="text-2xl font-bold mb-2">Analysis</h2>
                        <div className="flex items-center space-x-2">
                            <div 
                                className="w-4 h-4 rounded-full border-2 border-white/50"
                                style={{backgroundColor: color || '#6366f1'}}
                            ></div>
                            <span className="text-sm opacity-90">Mood Color</span>
                        </div>
                    </div>
                </div>

                {/* Analysis Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-4">
                        {analysisDataStructure.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div 
                                    key={item.name} 
                                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-200 group"
                                    style={{animationDelay: `${index * 100}ms`}}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className={`p-2 rounded-lg bg-white shadow-sm ${item.color}`}>
                                            <IconComponent className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed break-words">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                            <div className="flex items-center space-x-3">
                                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                                <span className="text-gray-900 font-medium">Analyzing your entry...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Editor;