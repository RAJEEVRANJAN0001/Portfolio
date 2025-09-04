import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageStorage, ContactMessage } from '../utils/messageStorage';
import { useTheme } from '../contexts/ThemeContext';

export default function AdminPanel() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const { isDark } = useTheme();

  // Simple password protection (in production, use proper authentication)
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'changeme';

  useEffect(() => {
    if (showAdmin) {
      loadMessages();
    }
  }, [showAdmin, filter]);

  const loadMessages = () => {
    let allMessages = MessageStorage.getAllMessages();
    
    if (filter === 'unread') {
      allMessages = allMessages.filter(msg => msg.status === 'unread');
    } else if (filter === 'read') {
      allMessages = allMessages.filter(msg => msg.status === 'read');
    }
    
    // Sort by newest first
    allMessages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setMessages(allMessages);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setShowAdmin(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleMarkAsRead = (messageId: string) => {
    MessageStorage.markAsRead(messageId);
    loadMessages();
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage({ ...selectedMessage, status: 'read' });
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      MessageStorage.deleteMessage(messageId);
      loadMessages();
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(null);
      }
    }
  };

  const exportMessages = () => {
    const data = MessageStorage.exportMessages();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-messages-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = MessageStorage.getMessageStats();

  if (!showAdmin) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          onClick={() => setShowAdmin(false)}
          className={`px-3 py-2 rounded-lg text-xs ${
            isDark 
              ? 'bg-gray-800/80 text-gray-400 hover:text-cyan-300' 
              : 'bg-white/80 text-gray-600 hover:text-blue-600'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          Admin
        </motion.button>
        
        {!showAdmin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute bottom-12 right-0 p-4 rounded-lg border ${
              isDark 
                ? 'bg-gray-800/90 border-cyan-500/20' 
                : 'bg-white/90 border-blue-300/30'
            } backdrop-blur-sm`}
          >
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-32 px-2 py-1 text-sm rounded border ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <button
                type="submit"
                className={`ml-2 px-2 py-1 text-xs rounded ${
                  isDark 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-blue-600 text-white'
                }`}
              >
                Login
              </button>
            </form>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Messages List */}
      <div className={`w-1/3 border-r overflow-y-auto ${
        isDark 
          ? 'bg-gray-900/95 border-gray-700' 
          : 'bg-white/95 border-gray-300'
      } backdrop-blur-sm`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-bold ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
              Messages ({stats.total})
            </h2>
            <button
              onClick={() => setShowAdmin(false)}
              className={`px-2 py-1 text-sm rounded ${
                isDark 
                  ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' 
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
              }`}
            >
              Close
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className={`p-2 rounded text-center ${
              isDark ? 'bg-gray-800/50' : 'bg-gray-100'
            }`}>
              <div className={`text-sm ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                Unread: {stats.unread}
              </div>
            </div>
            <div className={`p-2 rounded text-center ${
              isDark ? 'bg-gray-800/50' : 'bg-gray-100'
            }`}>
              <div className={`text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                Today: {stats.today}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-1 mb-4">
            {['all', 'unread', 'read'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as typeof filter)}
                className={`px-3 py-1 text-xs rounded ${
                  filter === f
                    ? isDark 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-blue-600 text-white'
                    : isDark 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-gray-200 text-gray-700'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <button
            onClick={exportMessages}
            className={`w-full mb-4 px-3 py-2 text-sm rounded border ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Export Messages
          </button>

          {/* Messages List */}
          <div className="space-y-2">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-3 rounded cursor-pointer border ${
                  selectedMessage?.id === message.id
                    ? isDark 
                      ? 'bg-cyan-600/20 border-cyan-500/50' 
                      : 'bg-blue-100 border-blue-300'
                    : isDark 
                      ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                } ${message.status === 'unread' ? 'border-l-4 border-l-orange-500' : ''}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`font-medium text-sm ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {message.name}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {message.email}
                </div>
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {new Date(message.timestamp).toLocaleDateString()}
                </div>
                <div className={`text-xs mt-1 truncate ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {message.message.substring(0, 50)}...
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Detail */}
      <div className={`flex-1 overflow-y-auto ${
        isDark ? 'bg-gray-800/95' : 'bg-gray-50/95'
      } backdrop-blur-sm`}>
        {selectedMessage ? (
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-xl font-bold ${
                  isDark ? 'text-cyan-300' : 'text-blue-700'
                }`}>
                  {selectedMessage.name}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedMessage.email}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {new Date(selectedMessage.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {selectedMessage.status === 'unread' && (
                  <button
                    onClick={() => handleMarkAsRead(selectedMessage.id)}
                    className={`px-3 py-1 text-sm rounded ${
                      isDark 
                        ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDeleteMessage(selectedMessage.id)}
                  className={`px-3 py-1 text-sm rounded ${
                    isDark 
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' 
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className={`p-4 rounded border ${
              isDark 
                ? 'bg-gray-700/50 border-gray-600' 
                : 'bg-white border-gray-200'
            }`}>
              <h4 className={`font-medium mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Message:
              </h4>
              <p className={`whitespace-pre-wrap ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {selectedMessage.message}
              </p>
            </div>

            <div className="mt-4">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: Contact from Portfolio`}
                className={`inline-block px-4 py-2 rounded ${
                  isDark 
                    ? 'bg-cyan-600 text-white hover:bg-cyan-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Reply via Email
              </a>
            </div>
          </div>
        ) : (
          <div className={`flex items-center justify-center h-full ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Select a message to view details
          </div>
        )}
      </div>
    </div>
  );
}
