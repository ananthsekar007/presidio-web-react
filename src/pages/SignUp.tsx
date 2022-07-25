import { gql, useMutation } from "@apollo/client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
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
import { LoginResponseParams } from "./Login";

interface SignUpInputParams {
  email: string;
  password: string;
  name: string;
}
interface SignUpInput {
  input: SignUpInputParams;
}

export interface User {
  name: string;
  email: string;
  user_id: number;
  is_admin: boolean;
}

interface SignUpResponse {
  signup: LoginResponseParams;
}

const USER_SIGNUP = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
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

export const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const [signup, signUpResponse] = useMutation<SignUpResponse, SignUpInput>(
    USER_SIGNUP
  );

  useErrorNotification([signUpResponse?.error as any]);

  useEffect(() => {
    if (signUpResponse?.data && signUpResponse?.data?.signup) {
      saveAuthToken(signUpResponse?.data?.signup?.token);
      saveUser(JSON.stringify(signUpResponse?.data?.signup?.user));
      navigate("/user/appointments");
    }
  }, [signUpResponse]);

  const handleSubmit = async () => {
    signup({
      variables: {
        input: {
          name,
          email,
          password,
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
            Register
          </Typography>
          <Box onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <UITextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <UITextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <UITextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <UIPrimaryButton
              fullWidth
              loading={loading}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Register
            </UIPrimaryButton>
            <Grid container>
              <Grid item>
                <a
                  href="#"
                  onClick={() => {
                    navigate("/user/login");
                  }}
                >
                  {"Already have an account? Sign In"}
                </a>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
            <Divider style={{ marginTop: 20 }} />
            <UIPrimaryButton
              fullWidth
              color="secondary"
              variant="contained"
              onClick={() => {
                navigate("/admin/login");
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              Admin Login
            </UIPrimaryButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
