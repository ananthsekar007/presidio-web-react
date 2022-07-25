import { useMutation } from "@apollo/client";
import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UIPrimaryButton } from "../components/UIComponents/UIPrimaryButton";
import { UITextField } from "../components/UIComponents/UITextField";
import { useErrorNotification } from "../hooks/useNotification";
import { saveAuthToken, saveUser } from "../utils/localStorage";
import { LoginInput, LoginResponse, USER_LOGIN } from "./Login";

export const AdminLogin = () => {
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
      navigate("/admin/centers");
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
    <Container>
      <Grid
        container
        style={{ height: "100vh" }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} md={6}>
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
              Admin Login
            </Typography>

            <Box onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <UITextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
              />
              <UIPrimaryButton
                fullWidth
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </UIPrimaryButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
