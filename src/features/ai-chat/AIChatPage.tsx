import { useState } from 'react';
import { motion } from 'framer-motion';
import { TangibleCard } from '@/components/ui/tangible-card';
import { TangibleButton } from '@/components/ui/tangible-button';
import { TangibleInput } from '@/components/ui/tangible-input';
import { Send, Bot, User } from 'lucide-react';
import { toast } from 'sonner';
import { GEMINI_CONFIG } from '@/config/gemini';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant powered by Gemini. I can help you analyze your subscriptions, provide insights, and answer questions. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Check if API key is configured
    if (!GEMINI_CONFIG.apiKey) {
      toast.error('Please configure your Gemini API key in src/config/gemini.ts');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await fetch(
        `${GEMINI_CONFIG.baseUrl}/models/${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: input,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get response from Gemini');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to get response from AI. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="h-[calc(100vh-8rem)]"
      >
        <TangibleCard className="h-full flex flex-col bg-card">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-6 p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="mt-2 text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="max-w-[75%] rounded-2xl px-5 py-3 bg-muted">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-6 bg-card">
            <div className="flex gap-3 items-center">
              <TangibleInput
                placeholder="Message AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                className="flex-1 bg-muted border-0 rounded-3xl px-5 py-3"
                disabled={isLoading}
              />
              <TangibleButton
                size="icon"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="rounded-full h-11 w-11"
              >
                <Send className="h-5 w-5" />
              </TangibleButton>
            </div>
          </div>
        </TangibleCard>
      </motion.div>
    </div>
  );
};
