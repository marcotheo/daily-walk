"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RegexValidations } from "@/lib/utils";

const schema = v.pipe(
  v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your email."),
      v.email("The email address is badly formatted.")
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your password."),
      v.minLength(8, "Your password must have 8 characters or more."),
      v.maxLength(64, "Your password must not have more than 64 characters"),
      v.regex(
        RegexValidations.hasSpecialChar,
        "Your password must have special character"
      ),
      v.regex(
        RegexValidations.hasLowerCase,
        "Your password must have lower case"
      ),
      v.regex(
        RegexValidations.hasUpperCase,
        "Your password must have upper case"
      ),
      v.regex(RegexValidations.hasNumber, "Your password must have a number")
    ),
    confirmPassword: v.pipe(
      v.string(),
      v.nonEmpty("Please confirm your password.")
    ),
    consent: v.boolean(),
  }),
  v.forward(
    v.check(
      ({ password, confirmPassword }) => password === confirmPassword,
      "Password do not match"
    ),
    ["confirmPassword"]
  ),
  v.forward(
    v.check(
      ({ consent }) => !!consent,
      "Can't proceed withtout accepting terms"
    ),
    ["consent"]
  )
);

type FormInputs = v.InferInput<typeof schema>;

export default function SignUpForm() {
  const form = useForm<FormInputs>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      consent: false,
    },
  });

  const onSubmit = (data: FormInputs) => {
    console.log("Login Data:", data);
    // Send to your login API here
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          return field.onChange(checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Accept terms and conditions
                    </FormLabel>
                  </div>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
}
