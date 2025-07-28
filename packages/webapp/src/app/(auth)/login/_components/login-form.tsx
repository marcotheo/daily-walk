"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { toast } from "sonner";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { LoadingOverlay } from "@/components/LoadingOverlay";

const schema = v.pipe(
  v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your email."),
      v.email("Invalid Email Address.")
    ),
    password: v.pipe(v.string(), v.nonEmpty("Please enter your password.")),
  })
);

type FormInputs = v.InferInput<typeof schema>;

export default function SignUpForm() {
  const router = useRouter();
  const userLogin = trpc.auth.signIn.useMutation();

  const form = useForm<FormInputs>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormInputs) => {
    userLogin.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (error) => {
          toast.error(error.message);
        },
        onSuccess: () => {
          form.reset();
          userLogin.reset();
          router.push("/");
          // setLogin(true);
        },
      }
    );
  };

  return (
    <div>
      <LoadingOverlay open={userLogin.isPending} message="Authenticating" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full rounded-sm" size="lg">
            LOG IN
          </Button>
        </form>
      </Form>
    </div>
  );
}
