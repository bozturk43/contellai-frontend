'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress, Grid, Link } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import * as z from 'zod';
import { LoginPayload } from '@/lib/types';


const loginSchema = z.object({
    email: z.string().email({ message: 'Geçerli bir e-posta adresi giriniz.' }),
    password: z.string().min(1, { message: 'Şifre alanı boş bırakılamaz.' }),
});

const LoginPage = () => {
    const { login, loginMutation } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginPayload> = (data) => {
        login(data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Giriş Yap</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal" required fullWidth label="E-posta Adresi" autoComplete="email" autoFocus
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        margin="normal" required fullWidth label="Şifre" type="password" autoComplete="current-password"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    {loginMutation.isError && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{loginMutation.error && loginMutation.error.message}</Alert>}
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} disabled={loginMutation.isPending}>
                        {loginMutation.isPending ? <CircularProgress size={24} /> : 'Giriş Yap'}
                    </Button>
                </Box>
                <Grid container justifyContent="flex-end">
                    <Grid>
                        <Link href="/register" variant="body2">
                            {"Hesabın yok mu? Kayıt Ol"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default LoginPage;