'use client';
import { useState, useRef, useEffect } from 'react';
import { Typography, Box, TextField, Button, Paper, CircularProgress, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { ChatMessage } from '@/lib/types';
import { askAssistantAction, clearChatHistoryAction } from '@/lib/data';
import { useTypewriter } from '@/hooks/useTypwriter';
import { getChatHistory } from '@/services/api/assistant';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Silme ikonu


const AiMessage = ({ text }: { text: string }) => {
    const displayText = useTypewriter(text, 30);
    return <Typography sx={{ whiteSpace: 'pre-wrap' }}>{displayText}</Typography>;
};

export default function ChatAssistant() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const scrollableBoxRef = useRef<null | HTMLDivElement>(null);
    const queryClient = useQueryClient();


    const { data: initialMessages, isLoading: isHistoryLoading } = useQuery({
        queryKey: ['chatHistory'],
        queryFn: getChatHistory,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (initialMessages && initialMessages.length > 0) {
            setMessages(initialMessages);
        } else if (!isHistoryLoading) {
            // Eğer geçmiş yoksa (boş dizi geldiyse) veya yükleme bittiyse, 
            // varsayılan karşılama mesajını göster
            setMessages([
                { sender: 'ai', text: `Merhaba ${user?.name || ''}! Ben Connie, senin yapay zeka asistanın. Uygulamayı nasıl kullanacağımı bana sorabilir veya sosyal medya ipuçları isteyebilirsin.` }
            ]);
        }
    }, [initialMessages, isHistoryLoading, user]);

    const askMutation = useMutation({
        mutationFn: ({ history, newMessage }: { history: ChatMessage[], newMessage: string }) => askAssistantAction(history, newMessage),
        onSuccess: (data) => {
            setMessages(prev => [...prev, { sender: 'ai', text: data }]);
        },
        onError: (error) => {
            setMessages(prev => [...prev, { sender: 'ai', text: `Üzgünüm, bir hata oluştu: ${error.message}` }]);
        }
    });
    const clearHistoryMutation = useMutation({
        mutationFn: clearChatHistoryAction,
        onSuccess: () => {
            // 'chatHistory' sorgusunu geçersiz kılarak listenin yenilenmesini sağla
            queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
        }
    });
    const lastMessage = messages[messages.length - 1];
    const isLastMessageFromAi = lastMessage?.sender === 'ai';

    // Daktilo efektini, sadece son mesaj AI'dan geliyorsa ve mutation beklemiyorsa çalıştır.
    const typewriterText = useTypewriter(isLastMessageFromAi && !askMutation.isPending ? lastMessage.text : '', 20);

    useEffect(() => {
        // Scroll efekti artık sadece messages değiştiğinde değil,
        // daktilo efekti her yeni harf yazdığında (typewriterText değiştiğinde) da tetiklenecek.
        if (scrollableBoxRef.current) {
            scrollableBoxRef.current.scrollTop = scrollableBoxRef.current.scrollHeight;
        }
    }, [messages, typewriterText]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        const history = newMessages.slice(-10);
        askMutation.mutate({ history, newMessage: input });
        setInput('');
    };
    const handleClearHistory = () => {
        setConfirmOpen(false);
        clearHistoryMutation.mutate();
    };

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Yapay Zeka Asistanın Connie</Typography>
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => setConfirmOpen(true)}
                    disabled={clearHistoryMutation.isPending}>
                    Sohbeti Temizle
                </Button>
            </Box>
            <Box ref={scrollableBoxRef} sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, pr: 1 }}>
                {messages.map((msg, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, gap: 2, flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                        <Avatar sx={{ bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main' }}>
                            {msg.sender === 'user' ? user?.name.charAt(0).toUpperCase() : <SmartToyIcon />}
                        </Avatar>
                        <Paper elevation={0} sx={{ p: 1.5, borderRadius: '16px', bgcolor: msg.sender === 'user' ? 'primary.light' : '#f0f0f0' }}>
                            {msg.sender === 'ai' ? <AiMessage text={msg.text} /> : <Typography sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>}
                        </Paper>
                    </Box>
                ))}
                {askMutation.isPending &&
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}><SmartToyIcon /></Avatar>
                        <Paper elevation={0} sx={{ p: 1.5, borderRadius: '16px', bgcolor: '#f0f0f0' }}><CircularProgress size={20} /></Paper>
                    </Box>
                }
            </Box>

            <Box
                component="form"
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                sx={{ display: 'flex', gap: 1 }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Uygulama hakkında bir soru sor..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={askMutation.isPending}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                />
                <Button type="submit" variant="contained" disabled={askMutation.isPending}>Gönder</Button>
            </Box>
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Sohbeti Temizle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tüm sohbet geçmişini kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>İptal</Button>
                    <Button onClick={handleClearHistory} color="error">Sil</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}