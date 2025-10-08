'use client';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Alert, Box, Typography, Card, CardMedia } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateContentPreview, saveContentPost } from '@/services/api/contentPosts';
import { CreateContentPostPayload, GeneratedContentResult, Post, SaveContentPostDto } from '@/lib/types';

const schema = z.object({
  userPrompt: z.string().min(10, 'İstek en az 10 karakter olmalıdır.'),
});
type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  workspaceId: string;
}

const CreateContentModal = ({ open, onClose, workspaceId }: Props) => {
    const [generatedContent, setGeneratedContent] = useState<GeneratedContentResult | null>(null);
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors }, reset,getValues } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: generateContentPreview,
        onSuccess: (data) => {
            setGeneratedContent(data);
        },
    });
    const saveMutation = useMutation({
        mutationFn: saveContentPost,
        onSuccess: (newlySavedPost) => {
            queryClient.setQueryData<Post[]>(['posts', workspaceId], (oldData) => {
                const currentPosts = oldData ?? [];
                return [newlySavedPost, ...currentPosts];
            });

            handleCloseDialog();
        }
    });
    const handleSave = () => {
        if (generatedContent) {
             const payload: SaveContentPostDto = {
                workspaceId: workspaceId,
                userPrompt: getValues("userPrompt"),
                generatedText: generatedContent.text,
                generatedAssetUrl: generatedContent.imageUrl,
                contentType: 1,
             };
             saveMutation.mutate(payload);
        }
    };
    const onSubmit = (data: FormData) => {
        const payload: CreateContentPostPayload = {
            workspaceId,
            userPrompt: data.userPrompt,
            contentType: 1,
        };
        mutation.mutate(payload);
    };
    const handleCloseDialog = () => {
        reset();
        setGeneratedContent(null);
        mutation.reset();
        onClose();
    };
    return (
        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md">
            {generatedContent ? (
                <>
                    <DialogTitle>Üretilen İçerik Önizlemesi</DialogTitle>
                    <DialogContent>
                        <Card variant="outlined">
                            <CardMedia
                                component="img"
                                height="300"
                                image={generatedContent.imageUrl}
                                alt="AI Generated Image"
                            />
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {generatedContent.text}
                                </Typography>
                            </Box>
                        </Card>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setGeneratedContent(null); mutation.reset(); }}>Farklı Bir Sonuç Dene</Button>
                        <Button onClick={handleSave} variant="contained">Kaydet</Button>
                    </DialogActions>
                </>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Yeni İçerik Üret</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Ne hakkında bir içerik istersin?"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            {...register('userPrompt')}
                            error={!!errors.userPrompt}
                            helperText={errors.userPrompt?.message}
                            disabled={mutation.isPending}
                        />
                        {mutation.isError && <Alert severity="error" sx={{ mt: 2 }}>{mutation.error.message}</Alert>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>İptal</Button>
                        <Button type="submit" variant="contained" disabled={mutation.isPending}>
                            {mutation.isPending ? <CircularProgress size={24} /> : 'Üret'}
                        </Button>
                    </DialogActions>
                </form>
            )}
        </Dialog>
    );
};

export default CreateContentModal;