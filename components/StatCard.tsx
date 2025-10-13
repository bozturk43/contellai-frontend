import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

 const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
    <Card>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 56, height: 56 }}>
                    {icon}
                </Avatar>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
                    <Typography color="text.secondary">{title}</Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);
export default StatCard;
