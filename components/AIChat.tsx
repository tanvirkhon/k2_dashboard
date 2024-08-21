import React, { useState } from 'react'

export default function AIChat() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: input }])
      // Here you would typically send the message to your AI service
      // For now, we'll just simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', content: "I'm sorry, I'm just a mock AI. I can't actually analyze your trades yet." }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4 h-64 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${message.role === 'user' ? 'bg-blue-500' : 'bg-gray-700'}`}>
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-gray-700 rounded-l px-4 py-2"
          placeholder="Ask about your trades..."
        />
        <button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r">
          Send
        </button>
      </div>
    </div>
  )
}