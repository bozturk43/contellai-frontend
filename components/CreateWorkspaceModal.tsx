'use client';
import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stepper, Step, StepLabel, TextField, CircularProgress, Alert } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type CreateWorkspaceDto } from '@/lib/types';
import { createWorkspaceAction } from '@/lib/data';

// Adımları tanımlıyoruz
const steps = ['Marka Bilgileri', 'Hedef Kitle', 'Marka Sesi & Tonu'];

// Zod ile formun tamamı için doğrulama şeması
const schema = z.object({
  brandName: z.string().min(2, 'Marka adı en az 2 karakter olmalıdır.'),
  industry: z.string().optional(),
  targetAudience: z.string().optional(),
  brandTone: z.string().optional(),
  keywords: z.string().optional(),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateWorkspaceModal = ({ open, onClose }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, formState: { errors }, trigger, reset } = useForm<CreateWorkspaceDto>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: createWorkspaceAction,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        handleCloseDialog();
    },
  });

  const handleNext = async () => {
    // Sonraki adıma geçmeden önce mevcut adımdaki alanları doğrula
    let isValid = false;
    if (activeStep === 0) isValid = await trigger("brandName");
    else isValid = true; // Diğer adımlarda zorunlu alan yok

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCloseDialog = () => {
    reset();
    setActiveStep(0);
    mutation.reset();
    onClose();
  };

  const onSubmit: SubmitHandler<CreateWorkspaceDto> = (data) => {
    mutation.mutate(data);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField autoFocus margin="dense" label="Marka Adı*" fullWidth {...register('brandName')} error={!!errors.brandName} helperText={errors.brandName?.message} />
            <TextField margin="dense" label="Sektör (Örn: Teknoloji, Gıda)" fullWidth {...register('industry')} />
          </>
        );
      case 1:
        return <TextField autoFocus margin="dense" label="Hedef Kitle (Örn: Genç profesyoneller, öğrenciler)" fullWidth multiline rows={4} {...register('targetAudience')} />;
      case 2:
        return (
            <>
                <TextField autoFocus margin="dense" label="Marka Sesi ve Tonu (Örn: Samimi, esprili, kurumsal)" fullWidth multiline rows={4} {...register('brandTone')} />
                <TextField margin="dense" label="Anahtar Kelimeler (Virgülle ayırın)" fullWidth {...register('keywords')} />
            </>
        );
      default:
        return 'Bilinmeyen adım';
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogTitle>Yeni Çalışma Alanı Oluştur</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => ( <Step key={label}><StepLabel>{label}</StepLabel></Step> ))}
        </Stepper>
        {getStepContent(activeStep)}
        {mutation.isError && <Alert severity="error" sx={{ mt: 2 }}>{mutation.error.message}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>İptal</Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button disabled={activeStep === 0} onClick={handleBack}>Geri</Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={mutation.isPending}>
            {mutation.isPending ? <CircularProgress size={24} /> : 'Oluştur'}
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>İleri</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateWorkspaceModal;