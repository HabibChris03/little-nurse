import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Video, Search, MoreVertical, CheckCheck, Smile } from 'lucide-react';

const mockMessages = [
  { id: 1, sender: 'admin', text: 'Hello Dr. Smith. We have a new critical delivery inbound for patient Eleanor Pena. ETA is 15 minutes.', time: '10:42 AM' },
  { id: 2, sender: 'me', text: 'Thanks for the heads up. Have they completed their preliminary paperwork?', time: '10:44 AM' },
  { id: 3, sender: 'admin', text: 'Yes, everything is uploaded in the Queue system. Vital signs look stable.', time: '10:45 AM' },
  { id: 4, sender: 'me', text: 'Perfect. I will review the documents now.', time: '10:46 AM' },
];

export default function AdminChat() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInput('');
    
    // Mock admin reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'admin',
        text: 'Received. Let me know if you need any additional diagnostic info.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)] max-w-5xl mx-auto flex bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden"
    >
      {/* Sidebar - Contacts / Info */}
      <div className="w-80 border-r border-slate-100 bg-slate-50/50 flex flex-col  md:flex">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Support Chat</h2>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-sm font-medium transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="p-3 bg-sky-50 border border-sky-100 rounded-2xl flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold tracking-wider">
                AD
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="font-bold text-slate-800 text-sm">System Admin</h3>
              <p className="text-xs text-slate-500 truncate mt-0.5">Received. Let me know if you...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/20">
        {/* Chat Header */}
        <div className="h-20 px-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold tracking-wider">
                AD
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                System Admin
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] uppercase font-bold rounded-full">Online</span>
              </h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Priority Support Desk</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-2.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors"><Phone size={18} /></button>
             <button className="p-2.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors"><Video size={18} /></button>
             <div className="w-px h-6 bg-slate-200 mx-1"></div>
             <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg) => {
              const isMe = msg.sender === 'me';
              return (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] md:max-w-[60%] flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    {!isMe && (
                      <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-600 mb-6">
                        AD
                      </div>
                    )}
                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div 
                        className={`px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                          isMe 
                            ? 'bg-sky-500 text-white rounded-br-sm shadow-sm shadow-sky-500/20' 
                            : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 mt-1.5 text-xs font-semibold text-slate-400 px-1">
                        {msg.time}
                        {isMe && <CheckCheck size={14} className="text-sky-500 ml-1" />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <form onSubmit={handleSend} className="flex items-end gap-3 max-w-4xl mx-auto">
            <div className="flex-1 relative rounded-2xl bg-slate-50 border border-slate-200 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-500/10 transition-all flex items-center">
              <button type="button" className="p-3 text-slate-400 hover:text-sky-500 transition-colors ml-1">
                <Smile size={20} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message to Admin..." 
                className="flex-1 bg-transparent border-none focus:ring-0 px-2 py-3.5 text-sm outline-none text-slate-700 font-medium placeholder:text-slate-400"
              />
            </div>
            <button 
              type="submit"
              disabled={!input.trim()}
              className="p-3.5 bg-sky-500 disabled:bg-slate-200 disabled:text-slate-400 hover:bg-sky-600 text-white rounded-2xl transition-all shadow-md shadow-sky-500/20 disabled:shadow-none flex shrink-0 items-center justify-center"
            >
              <Send size={20} className={input.trim() ? "ml-1" : ""} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
