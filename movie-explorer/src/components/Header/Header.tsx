import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FloatingLogin, SearchContainer, SearchInput, StyledAppBar } from "./Header.styled";
import { Box, Button, IconButton, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../../theme";
import { setQuery } from "../../store/moviesSlice";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch(setQuery((e.target as HTMLInputElement).value));
        }
    };

    const toggleLogin = () => setIsLoginOpen((prev) => !prev);

    return (
        <StyledAppBar position="static" theme={theme}>
            <Toolbar>
                <Typography fontFamily="Roboto" variant="h4" sx={{ flexGrow: 0.2, fontWeight: "bold" }}>
                    Movie Explorer
                </Typography>
                <SearchContainer borderRadius="1.5rem">
                    <SearchInput
                        theme={theme}
                        placeholder="Search for a movie..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        endAdornment={
                            <InputAdornment 
                                position="start"
                                onClick={() => dispatch(setQuery(search))}
                                sx={{ cursor: "pointer" }}
                            >
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </SearchContainer>
                <Box>
                    <IconButton color="inherit" onClick={toggleLogin}>
                        <AccountCircle />
                    </IconButton>
                </Box>
                {isLoginOpen && (
                    <FloatingLogin>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">{isSignUp ? "Sign Up" : "Login"}</Typography>
                            <IconButton size="small" onClick={toggleLogin}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        {isSignUp ? (
                            <>
                                <TextField label="Username" fullWidth margin="normal" />
                                <TextField label="Email" fullWidth margin="normal" />
                                <TextField label="Password" type="password" fullWidth margin="normal" />
                                <Button variant="contained" color="secondary" fullWidth>
                                    Sign Up
                                </Button>
                                <Typography variant="body2" align="center" mt={2}>
                                    Already have an account?{" "}
                                <Button onClick={() => setIsSignUp(false)}>Login</Button>
                                </Typography>
                            </>
                            ) : (
                            <>
                                <TextField label="Username" fullWidth margin="normal" />
                                <TextField label="Password" type="password" fullWidth margin="normal" />
                                <Button variant="contained" color="secondary" fullWidth>
                                    Login
                                </Button>
                                <Typography variant="body2" align="center" mt={2}>
                                    New user?{" "}
                                <Button onClick={() => setIsSignUp(true)}>Sign Up</Button>
                                </Typography>
                            </>
                        )}
                    </FloatingLogin>
                )}
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header;