"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type SignUpRequestBody,
  SignUpRequestBodySchema,
} from "@superdupersoftware/api/features/auth/signUp/signUp.schema";
import { Button } from "@superdupersoftware/ui/Button";
import { Form } from "@superdupersoftware/ui/Form";
import { TextField } from "@superdupersoftware/ui/TextField";
import { Controller, useForm } from "react-hook-form";
import "./sign-up.css";
import { usePostApiAuthSignUp } from "@superdupersoftware/api-client/generated/query";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const { mutate, isPending } = usePostApiAuthSignUp({
    mutation: {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error) => {
        if (error.isAxiosError) {
          // TODO: proper error message
          alert("API error during sign up:" + error.response?.data.message);
        }
      },
    },
  });
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(SignUpRequestBodySchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpRequestBody) => {
    mutate({
      data,
    });
  };

  return (
    <div className="sign-up-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              label="Name"
              placeholder="Enter your full name"
              {...field}
              isRequired
              validationBehavior="aria"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              label="Email"
              type="email"
              placeholder="info@superdupersoftware.net"
              {...field}
              isRequired
              validationBehavior="aria"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required." }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextField
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...field}
              isRequired
              validationBehavior="aria"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <div className="sign-up-submit">
          <Button type="submit" isPending={isPending}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
