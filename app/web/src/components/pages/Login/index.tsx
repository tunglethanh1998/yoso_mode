"use client";

import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input
          type="text"
          {...register("email")}
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
}
