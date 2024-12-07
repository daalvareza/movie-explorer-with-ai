import styled from "@emotion/styled";
import { AppBar, Box, InputBase, Paper } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: '10vh',
    justifyContent: 'center',
}));
  
export const SearchContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));
  
export const SearchInput = styled(InputBase)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: "0 10px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: theme.shadows[1],
}));

export const FloatingLogin = ({ children }: { children: React.ReactNode }) => (
    <Paper
      sx={{
        position: "absolute",
        top: "70px",
        right: "20px",
        width: "300px",
        padding: 2,
        zIndex: 1000,
        boxShadow: 5,
      }}
    >
      {children}
    </Paper>
);
