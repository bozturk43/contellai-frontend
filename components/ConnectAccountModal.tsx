'use client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { connectAccount } from '@/services/api/accounts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlatformType } from '@/lib/types';

const schema = z.object({
  platform: z.nativeEnum(PlatformType),
  platformUsername: z.string().min(3, 'Kullanıcı adı en az 3 karakter olmalıdır.'),
});
type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  workspaceId: string;
}

const ConnectAccountModal = ({ open, onClose, workspaceId }: Props) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: connectAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workspace', workspaceId] });
            handleCloseDialog();
        },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        mutation.mutate({
            workspaceId,
            platform: data.platform,
            platformUsername: data.platformUsername,
        });
    };

    const handleCloseDialog = () => {
        reset();
        mutation.reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Yeni Sosyal Medya Hesabı Bağla</DialogTitle>
                <DialogContent sx={{ pt: '20px !important' }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="platform-select-label">Platform</InputLabel>
                        <Select
                            labelId="platform-select-label"
                            label="Platform"
                            defaultValue={PlatformType.Instagram}
                            {...register('platform', { valueAsNumber: true })}
                        >
                            <MenuItem value={PlatformType.Instagram}>Instagram</MenuItem>
                            <MenuItem value={PlatformType.Facebook} disabled>Facebook (Yakında)</MenuItem>
                            <MenuItem value={PlatformType.Twitter} disabled>Twitter/X (Yakında)</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Platform Kullanıcı Adı"
                        fullWidth
                        variant="outlined"
                        {...register('platformUsername')}
                        error={!!errors.platformUsername}
                        helperText={errors.platformUsername?.message}
                    />
                    {mutation.isError && <Alert severity="error" sx={{ mt: 2 }}>{mutation.error.message}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>İptal</Button>
                    <Button type="submit" variant="contained" disabled={mutation.isPending}>
                        {mutation.isPending ? <CircularProgress size={24} /> : 'Bağla'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ConnectAccountModal;