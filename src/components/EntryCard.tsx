import { Calendar, FileText, Smile } from "lucide-react";

const EntryCard = ({ entry }) => {
    const date = new Date(entry.createdAt).toDateString();
    const { summery, mood, color } = entry.analysis || {};

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">{date}</span>
                    </div>
                    {color && (
                        <div
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                            title="Mood color"
                        ></div>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1">Summary</h3>
                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                                {summery || "No summary available"}
                            </p>
                        </div>
                    </div>

                    {mood && (
                        <div className="flex items-center space-x-3">
                            <Smile className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-gray-900">Mood:</span>
                                <span className="text-sm text-gray-700 ml-1">{mood}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EntryCard;