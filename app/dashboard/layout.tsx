import Sidebar from "@/components/SideBar";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
        <Sidebar />
        <Box
            component="div"
            sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
            {children}
        </Box>
    </Box>
  );
}