import Sidebar from "@/components/SideBar";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Bu Box, ana layout'taki 'main' alanının içini yatayda tamamen kaplar
    <Box sx={{ display: 'flex', width: '100%' }}>
        <Sidebar />
        <Box
            component="div"
            sx={{ flexGrow: 1, p: 3, overflow: 'auto' }} // İçerik taşarsa scroll ekle
        >
            {/* O anki sayfanın içeriği (/dashboard veya /dashboard/workspaces/[id]) buraya gelecek */}
            {children}
        </Box>
    </Box>
  );
}