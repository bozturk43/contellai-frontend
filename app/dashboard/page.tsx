'use client'; 
import { useState, useRef, useEffect } from 'react';
import { Typography, Box, TextField, Button, Paper, CircularProgress, Avatar } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { ChatMessage } from '@/lib/types';
import { askAssistantAction } from '@/lib/data';
import { useTypewriter } from '@/hooks/useTypwriter';

const AiMessage = ({ text }: { text: string }) => {
    const displayText = useTypewriter(text, 20);
    return <Typography sx={{ whiteSpace: 'pre-wrap' }}>{displayText}</Typography>;
};

export default function DashboardPage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: `Merhaba ${user?.name || ''}! Ben Connie, senin yapay zeka asistanın. Uygulamayı nasıl kullanacağımı bana sorabilir veya sosyal medya ipuçları isteyebilirsin.` }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef<null | HTMLDivElement>(null);

    const mutation = useMutation({
        mutationFn: ({ history, newMessage }: { history: ChatMessage[], newMessage: string }) => askAssistantAction(history, newMessage),
        onSuccess: (data) => {
            setMessages(prev => [...prev, { sender: 'ai', text: data }]);
        },
        onError: (error) => {
            setMessages(prev => [...prev, { sender: 'ai', text: `Üzgünüm, bir hata oluştu: ${error.message}` }]);
        }
    });

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        
        const userMessage: ChatMessage = { sender: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        const history = newMessages.slice(-10); 
        mutation.mutate({ history, newMessage: input });
        setInput('');
    };

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px - 58px - 48px)' /* Navbar, Footer ve padding'leri çıkar */ }}>
            
            {/* Mesajların gösterildiği alan */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, pr: 2 }}>
                {messages.map((msg, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, gap: 2, flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                        <Avatar sx={{ bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main' }}>
                            {msg.sender === 'user' ? user?.name.charAt(0).toUpperCase() : <SmartToyIcon />}
                        </Avatar>
                        <Paper elevation={1} sx={{ p: 1.5, borderRadius: '16px', bgcolor: msg.sender === 'user' ? 'primary.light' : 'background.paper' }}>
                            {msg.sender === 'ai' ? <AiMessage text={msg.text} /> : <Typography sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>}
                        </Paper>
                    </Box>
                ))}
                {mutation.isPending && 
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}><SmartToyIcon /></Avatar>
                        <Paper elevation={1} sx={{ p: 1.5, borderRadius: '16px' }}><CircularProgress size={20} /></Paper>
                    </Box>
                }
                <div ref={chatEndRef} />
            </Box>

            {/* Mesaj giriş alanı */}
            <Box
                component="form"
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                sx={{ display: 'flex', gap: 1, mt: 'auto' }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Uygulama hakkında bir soru sor veya bir ipucu iste..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={mutation.isPending}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                />
                <Button type="submit" variant="contained" disabled={mutation.isPending}>Gönder</Button>
            </Box>
        </Box>
    );
}