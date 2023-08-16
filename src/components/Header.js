import React, { useRef, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Alert,
  Badge,
  DialogContentText,
  OutlinedInput,
  Button,
  Box,
  MenuItem,
  Menu,
  Divider,
  InputAdornment,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Link,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Troubleshoot,
  TroubleshootOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";

import { login, logout, signup } from "../feature/auth/auth";
import { clearMessage } from "../feature/message";

const Header = () => {
  let navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleUserInput = (e) => setFirstName(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleConfirmPwdInput = (e) => setConfirmPassword(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);

  const { user: currentUser } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSignupLinkClick = (event) => {
    event.preventDefault();
    setShowSignup(true);
  };

  const showForgotPasswordForm = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(signup({ firstName, email, password })).unwrap();
      // Successful signup, show success Snackbar
      // You can add a success message in the signup action and use it here if needed
      setLoading(false);
      setFirstName("");
      setEmail("");
      setPassword("");
      handleUserMenuClose();
      handleDialogClose();
    } catch (err) {
      // Signup failed, show error Snackbar
      console.log("header message", err);
      setLoading(false);
    }
  };

  const handleLoginLinkClick = (event) => {
    event.preventDefault();
    setShowSignup(false);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogin = () => {
    handleUserMenuClose();
    setLoginDialogOpen(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(login({ email, password }));
      setEmail("");
      setPassword("");
      handleUserMenuClose();
      handleDialogClose();
      console.log("hear ", message);
    } catch (err) {
      setErrMsg("Please check your email and password.");
    }
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .catch(() => {
        setLoading(false);
      });

    navigate("/");
    handleUserMenuClose();
  };

  const handleDialogClose = () => {
    setLoginDialogOpen(false);
  };

  // Replace 'YourAppName' with your app name and 'YourLogoUrl' with your logo URL
  return (
    <AppBar color="transparent" sx={{
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.03), 0px 1px 1px -1px rgba(0,0,0,0.01)" , backgroundColor:"white",
    }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        ></Typography>
        <div>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            onChange={handleSearchChange}
            placeholder="Search items"
            sx={{ color: "inherit", width: "500px" }}
            value={searchText}
            size="small"
            endAdornment={
              <InputAdornment position="end">
                {searchText ? (
                  <Button
                    variant="text"
                    color="primary"
                    startIcon={<AccountCircleOutlinedIcon fontSize="20" />}
                    onClick={() => {}}
                    sx={{ ml: 2, marginLeft: 3 }}
                  >
                    Search
                  </Button>
                ) : null}
              </InputAdornment>
            }
          />
        </div>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {/* User Menu */}
          {isLoggedIn ? (
            // Logged In
            <>
              <IconButton sx={{ ml: 2 }} color="inherit">
                <Badge badgeContent={3} color="error">
                  <NotificationsOutlinedIcon />
                </Badge>
              </IconButton>
              <Button
                variant="text"
                color="inherit"
                startIcon={<AccountCircleOutlinedIcon fontSize="20" />}
                onClick={handleUserMenuOpen}
                sx={{ ml: 2, marginLeft: 3 }}
              >
                {currentUser.userProfile.firstName}
              </Button>
            </>
          ) : (
            // Guest
            <Button
              variant="text"
              color="inherit"
              startIcon={<AccountCircleOutlinedIcon />}
              onClick={handleUserMenuOpen}
              sx={{ mr: 2, marginLeft: 3 }}
            >
              Login
            </Button>
          )}

          {/* Login/Sign In Menu */}
          <Menu
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
          >
            {!isLoggedIn && [
              <MenuItem key="login" onClick={handleLogin}>
                Login | Signup
              </MenuItem>,
              <MenuItem key="signup">Sign Up</MenuItem>,
            ]}
            {isLoggedIn && [
              <MenuItem
                key="profile"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <ListItemIcon>
                  <AccountCircleOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>,
              <MenuItem
                key="bookings"
                onClick={() => {
                  navigate("/bookings");
                }}
              >
                <ListItemIcon>
                  <BookmarkBorderOutlinedIcon fontSize="small" />
                </ListItemIcon>
                My Bookings
              </MenuItem>,
              <MenuItem
                key="listing"
                onClick={() => {
                  navigate("/listing");
                }}
              >
                <ListItemIcon>
                  <FeaturedPlayListOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Item Management
              </MenuItem>,
              <Divider key="divider" />,
              <MenuItem
                key="settings"
                onClick={() => {
                  navigate("/settings");
                }}
              >
                <ListItemIcon>
                  <SettingsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>,
              <MenuItem
                key="support"
                onClick={() => {
                  navigate("/support");
                }}
              >
                <ListItemIcon>
                  <HelpCenterOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Help and Support
              </MenuItem>,
              <Divider key="divider2" />,
              <MenuItem key="logout" onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>,
            ]}
          </Menu>
        </Box>
      </Toolbar>

      {/* Login Dialog */}
      <Dialog
        open={loginDialogOpen}
        onClose={handleDialogClose}
        sx={{ "& .MuiDialog-paper": { maxWidth: "400px" } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          {/* Your brand logo */}
          <img
            src="/path/to/your/logo.png"
            alt="Brand Logo"
            style={{ width: "100px" }}
          />
        </Box>
        <DialogTitle>{showSignup ? "Sign Up" : "Login"}</DialogTitle>
        <DialogContent sx={{ padding: "20px" }}>
          <DialogContentText>
            {showSignup
              ? "Create an account to get started"
              : "Login to your existing account"}
          </DialogContentText>
          <form
            onSubmit={showSignup ? handleSignupSubmit : handleLoginSubmit}
            method="POST"
          >
            {errMsg && <Alert severity="error">{errMsg}</Alert>} {}
            {showSignup && (
              <>
                <TextField
                  label="First name"
                  type="text"
                  required
                  fullWidth
                  margin="normal"
                  onChange={handleUserInput}
                  value={firstName}
                  sx={{ color: "inherit" }}
                />
                {/* First Name, Last Name, and South African Cellphone Number fields */}
              </>
            )}
            {/* Email and Password fields */}
            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailInput}
              sx={{ color: "inherit" }}
            />
            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePwdInput}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "0x" }}>
              <Link
                onClick={() => {
                  navigate("/PasswordReset");
                }}
                sx={{ fontSize: 12, textDecoration: "none" }}
              >
                Forgot Password
              </Link>
            </Box>
            {showSignup && (
              <>
                <TextField
                  label="Confirm Password"
                  type="password"
                  required
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={handleConfirmPwdInput}
                />
                <FormControlLabel
                  control={<Checkbox required />}
                  label="I accept the terms and conditions"
                  sx={{ mt: 2 }}
                />
              </>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "20px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "49%" }}
              >
                {showSignup ? "Sign Up" : "Login"}
              </Button>
              <Button
                variant="outlined"
                onClick={
                  showSignup ? handleLoginLinkClick : handleSignupLinkClick
                }
                sx={{ width: "49%" }}
              >
                {showSignup ? "LOGIN" : "SIGN UP"}
              </Button>
              {/* <Link href="#" onClick={showSignup ? handleLoginLinkClick : handleSignupLinkClick} sx={{ width: "49%", textAlign: "center", ml: 2 }}>
      {showSignup ? "LOGIN" : "SIGN UP"}
    </Link> */}
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
};

export default Header;
