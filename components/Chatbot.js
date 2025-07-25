import React from 'react';

const Chatbot = ({ showChatbot, setShowChatbot, chatMessages, currentMessage, setCurrentMessage, handleChatSubmit }) => (
  <div className={`fixed bottom-4 right-4 z-50 ${showChatbot ? 'w-80 h-96' : 'w-16 h-16'} transition-all duration-300`}>
    {!showChatbot ? (
      <button
        onClick={() => setShowChatbot(true)}
        className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        {/* MessageSquare icon will be imported or passed as a prop */}
      </button>
    ) : (
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
          <h3 className="text-white font-semibold">Code Saathi Assistant</h3>
          <button
            onClick={() => setShowChatbot(false)}
            className="text-white hover:bg-white/20 rounded-full p-1"
          >
            {/* X icon will be imported or passed as a prop */}
          </button>
        </div>
        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-800 text-gray-300'
              }`}>
                {msg.message}
              </div>
            </div>
          ))}
        </div>
        <div onSubmit={handleChatSubmit} className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit(e)}
              placeholder="Ask about mentors..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleChatSubmit}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {/* ChevronRight icon will be imported or passed as a prop */}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default Chatbot; 