'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress, Grid,Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { type RegisterPayload } from '@/lib/types';

const registerSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır.'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır.'),
});

const RegisterPage = () => {
    const { register: registerUser, registerMutation } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterPayload>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<RegisterPayload> = (data) => {
        registerUser(data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Kayıt Ol</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid size={{xs:12}}>
                            <TextField label="İsim Soyisim" required fullWidth {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
                        </Grid>
                        <Grid size={{xs:12}} >
                            <TextField label="E-posta Adresi" required fullWidth {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
                        </Grid>
                        <Grid size={{xs:12}} >
                            <TextField label="Şifre" type="password" required fullWidth {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
                        </Grid>
                    </Grid>
                    {registerMutation.isError && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{registerMutation.error && registerMutation.error.message}</Alert>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={registerMutation.isPending}>
                        {registerMutation.isPending ? <CircularProgress size={24} /> : 'Kayıt Ol'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Link href="/login" passHref>
                                <MuiLink variant="body2">Zaten bir hesabın var mı? Giriş Yap</MuiLink>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;