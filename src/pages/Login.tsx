import { gql, useMutation } from "@apollo/client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copyright } from "../components/UIComponents/Copyright";
import { UIPrimaryButton } from "../components/UIComponents/UIPrimaryButton";
import { UITextField } from "../components/UIComponents/UITextField";
import { useErrorNotification } from "../hooks/useNotification";
import { saveAuthToken, saveUser } from "../utils/localStorage";

interface LoginInputParams {
  email: string;
  password: string;
}
export interface LoginInput {
  input: LoginInputParams;
}

export interface User {
  name: string;
  email: string;
  user_id: number;
  is_admin: boolean;
}

export interface LoginResponseParams {
  token: string;
  user: User;
}
export interface LoginResponse {
  login: LoginResponseParams;
}

export const USER_LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        name
        email
        user_id
        is_admin
      }
    }
  }
`;

export const Login = () => {
  const navigate = useNavigate();

  const [login, LoginResponse] = useMutation<LoginResponse, LoginInput>(
    USER_LOGIN
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useErrorNotification([LoginResponse?.error as any]);

  useEffect(() => {
    if (LoginResponse?.data) {
      saveAuthToken(LoginResponse?.data?.login?.token);
      saveUser(JSON.stringify(LoginResponse?.data?.login?.user));
      navigate("/user/appointments");
    }
  }, [LoginResponse?.data]);

  const handleSubmit = async () => {
    login({
      variables: {
        input: {
          email: email,
          password: password,
        },
      },
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/npjP0dCtoxo)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Covid Vaccination
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="p" variant="subtitle1">
            Login
          </Typography>
          <Box onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <UITextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="email"
              autoFocus
            />
            <UITextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="current-password"
            />
            <UIPrimaryButton
              fullWidth
              loading={LoginResponse?.loading}
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </UIPrimaryButton>
            <Grid container>
              <Grid item xs>
                <a href="#">Forgot password?</a>
              </Grid>
              <Grid item>
                <a
                  href="#"
                  onClick={() => {
                    navigate("/user/signup");
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </a>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
