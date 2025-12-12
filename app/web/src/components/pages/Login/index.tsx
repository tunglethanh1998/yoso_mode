"use client";

import { authService } from "@/data/Auth";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    authService.login(data);
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          fullWidth
          className="mb-2"
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          fullWidth
          className="mb-4"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mb-4"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
