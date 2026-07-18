'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Send,
  Paperclip,
  Mic,
  MapPin,
  Image as ImageIcon,
  Phone,
  Video,
  MoreVertical,
  ArrowLeft,
  CheckCheck,
  Check,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VerifiedBadge } from '@/components/verified-badge';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'voice' | 'location';
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'TechHub Lagos',
    avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=200',
    verified: true,
    lastMessage: 'Yes, the iPhone 15 Pro is available',
    time: '2m',
    unread: 2,
    online: true,
    messages: [
      { id: 'm1', text: 'Hello! Is the iPhone 15 Pro Max still available?', sender: 'me', time: '10:30 AM', status: 'read' },
      { id: 'm2', text: 'Yes, it is! We have it in Natural Titanium and Blue Titanium.', sender: 'them', time: '10:31 AM' },
      { id: 'm3', text: 'Great! What is the best price you can offer?', sender: 'me', time: '10:32 AM', status: 'read' },
      { id: 'm4', text: 'The price is ₦1,250,000. We can offer free delivery within Lagos.', sender: 'them', time: '10:33 AM' },
      { id: 'm5', text: 'Yes, the iPhone 15 Pro is available', sender: 'them', time: '10:35 AM' },
    ],
  },
  {
    id: '2',
    name: "Ada's Fashion House",
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    verified: true,
    lastMessage: 'Your order has been shipped!',
    time: '1h',
    unread: 1,
    online: false,
    messages: [
      { id: 'm1', text: 'Hi, I would like to order the Ankara evening gown', sender: 'me', time: '9:00 AM', status: 'read' },
      { id: 'm2', text: 'Sure! What size would you need?', sender: 'them', time: '9:15 AM' },
      { id: 'm3', text: 'Size M please', sender: 'me', time: '9:20 AM', status: 'read' },
      { id: 'm4', text: 'Your order has been shipped!', sender: 'them', time: '11:00 AM' },
    ],
  },
  {
    id: '3',
    name: 'GreenFarm Produce',
    avatar: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=200',
    verified: true,
    lastMessage: 'Your vegetable basket is ready for delivery',
    time: '3h',
    unread: 0,
    online: true,
    messages: [
      { id: 'm1', text: 'Is the weekly vegetable basket still available?', sender: 'me', time: '8:00 AM', status: 'read' },
      { id: 'm2', text: 'Yes! Would you like to subscribe?', sender: 'them', time: '8:10 AM' },
      { id: 'm3', text: 'Yes please', sender: 'me', time: '8:15 AM', status: 'read' },
      { id: 'm4', text: 'Your vegetable basket is ready for delivery', sender: 'them', time: '10:00 AM' },
    ],
  },
  {
    id: '4',
    name: 'AutoDeals Nigeria',
    avatar: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=200',
    verified: true,
    lastMessage: 'You can come for inspection anytime',
    time: '1d',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', text: 'Can I inspect the Camry this weekend?', sender: 'me', time: 'Yesterday', status: 'read' },
      { id: 'm2', text: 'You can come for inspection anytime', sender: 'them', time: 'Yesterday' },
    ],
  },
];

export default function MessagingPage() {
  const [activeChat, setActiveChat] = useState<Conversation | null>(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  function sendMessage() {
    if (!messageText.trim() || !activeChat) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: messageText,
      sender: 'me',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      status: 'sent',
    };
    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, newMsg],
      lastMessage: messageText,
    });
    setMessageText('');

    setTimeout(() => setIsTyping(true), 1000);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: `m${Date.now() + 1}`,
        text: 'Thanks for your message! We will get back to you shortly.',
        sender: 'them',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      if (activeChat) {
        setActiveChat((prev) =>
          prev ? { ...prev, messages: [...prev.messages, reply] } : prev
        );
      }
    }, 3000);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Conversation list */}
      <div className={cn('w-full border-r border-border md:w-80 lg:w-96', activeChat && 'hidden md:block')}>
        <div className="border-b border-border p-4">
          <h1 className="font-display text-xl font-bold text-navy dark:text-white">Messages</h1>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="h-10 rounded-full pl-10" />
          </div>
        </div>
        <div className="overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveChat(conv)}
              className={cn(
                'flex w-full items-center gap-3 border-b border-border/50 p-4 text-left transition-colors hover:bg-muted/50',
                activeChat?.id === conv.id && 'bg-primary/5'
              )}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conv.avatar} alt={conv.name} />
                  <AvatarFallback>{conv.name[0]}</AvatarFallback>
                </Avatar>
                {conv.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-secondary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate text-sm font-medium text-navy dark:text-white">{conv.name}</h3>
                  {conv.verified && <VerifiedBadge className="h-3.5 w-3.5" />}
                </div>
                <p className="truncate text-xs text-muted-foreground">{conv.lastMessage}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">{conv.time}</span>
                {conv.unread > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                    {conv.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {activeChat ? (
        <div className="flex flex-1 flex-col">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-border p-4">
            <button
              onClick={() => setActiveChat(null)}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
              <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-semibold text-navy dark:text-white">{activeChat.name}</h2>
                {activeChat.verified && <VerifiedBadge className="h-4 w-4" />}
              </div>
              <p className="text-xs text-secondary">
                {activeChat.online ? 'Online now' : 'Last seen recently'}
              </p>
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
              <Phone className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
              <Video className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-4">
            {activeChat.messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('flex', msg.sender === 'me' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
                    msg.sender === 'me'
                      ? 'bg-warm-orange-gradient text-white'
                      : 'bg-card border border-border text-foreground'
                  )}
                >
                  <p>{msg.text}</p>
                  <div className={cn('mt-1 flex items-center gap-1 text-xs', msg.sender === 'me' ? 'text-white/70' : 'text-muted-foreground')}>
                    {msg.time}
                    {msg.sender === 'me' && msg.status === 'read' && <CheckCheck className="h-3 w-3" />}
                    {msg.sender === 'me' && msg.status === 'delivered' && <Check className="h-3 w-3" />}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="rounded-2xl border border-border bg-card px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-muted-foreground"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
                <Paperclip className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
                <ImageIcon className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
                <MapPin className="h-5 w-5" />
              </button>
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 rounded-full"
              />
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted">
                <Mic className="h-5 w-5" />
              </button>
              <Button
                onClick={sendMessage}
                size="icon"
                className="h-10 w-10 rounded-full bg-warm-orange-gradient"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden flex-1 items-center justify-center text-center md:flex">
          <div>
            <h2 className="font-display text-lg font-semibold text-muted-foreground">
              Select a conversation
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a chat to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
