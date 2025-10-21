import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TangibleCard } from './ui/tangible-card';
import { TangibleButton } from './ui/tangible-button';
import { TangibleInput } from './ui/tangible-input';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Xin chào! Tôi là trợ lý AI của LoopCutAI. Hãy thử nói 'Thêm Spotify premium' để thêm subscription nhé!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simple demo logic
    setTimeout(() => {
      let botResponse = "Tôi hiểu bạn muốn thêm subscription. Hãy vào trang Subscriptions và nhấn nút 'Thêm Subscription' để bắt đầu!";

      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('thêm') || lowerInput.includes('add')) {
        if (lowerInput.includes('spotify')) {
          botResponse = "Tuyệt! Tôi sẽ giúp bạn thêm Spotify Premium. Hãy vào trang Subscriptions, nhấn 'Thêm Subscription', nhập tên và dùng nút 'AI Assist' để tự động điền thông tin! ✨";
        } else if (lowerInput.includes('netflix')) {
          botResponse = "Được rồi! Để thêm Netflix, hãy vào trang Subscriptions, click 'Thêm Subscription', gõ 'Netflix' và click nút AI Assist - tôi sẽ tự động điền giá và thông tin! 🎬";
        } else {
          botResponse = "Tôi sẽ giúp bạn thêm subscription! Vào trang Subscriptions → click 'Thêm Subscription' → nhập tên → click 'AI Assist' để tự động điền thông tin thông minh! 🚀";
        }
      } else if (lowerInput.includes('xóa') || lowerInput.includes('hủy') || lowerInput.includes('cancel') || lowerInput.includes('remove')) {
        botResponse = "Để xóa subscription, hãy vào trang Subscriptions và nhấn nút 'Xóa' ở subscription bạn muốn hủy. Tôi có thể giúp bạn tìm subscription nào cần xóa không?";
      } else if (lowerInput.includes('bao nhiêu') || lowerInput.includes('chi phí') || lowerInput.includes('spending') || lowerInput.includes('how much')) {
        botResponse = "Bạn có thể xem chi tiêu của mình ở trang Reports. Tổng chi phí hàng tháng hiện tại được hiển thị trên Dashboard! 📊";
      } else if (lowerInput.includes('giúp') || lowerInput.includes('help')) {
        botResponse = "Tôi có thể giúp bạn:\n✅ Thêm subscription mới với AI Assist\n✅ Xóa subscription\n✅ Xem chi tiêu và báo cáo\n✅ Quản lý nhiều profile\nBạn cần giúp gì nào?";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput('');
  };

  return (
    <>
      {/* FAB */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <TangibleButton
          size="lg"
          className="h-14 w-14 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </TangibleButton>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-96"
          >
            <TangibleCard color="yellow">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-lg font-bold">🤖 Trợ Lý AI</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-foreground/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="my-4 h-80 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-[8px] border-[1.5px] border-border px-4 py-2 ${
                        message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="mt-1 text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <TangibleInput
                  placeholder="Nhập tin nhắn của bạn..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1"
                />
                <TangibleButton size="icon" onClick={handleSend}>
                  <Send className="h-5 w-5" />
                </TangibleButton>
              </div>
            </TangibleCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
