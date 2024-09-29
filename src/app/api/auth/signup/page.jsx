"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Github, Mail } from "lucide-react";
import { signUpSchema } from "@/lib/validation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { CredentialSignUp } from "../actions/action";

const SignUpForm = () => {
  const [isVerify, setIsVerify] = React.useState(false)
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {toast} = useToast()


async function onSubmit(data) {
  try {
    await CredentialSignUp(data)
    toast({
      title: "Account has been registered successfully!",
      description: "Please verify account and then Sign In!",
    });

    setIsVerify(true)
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Sign up failed",
      description: error.message,
    });
    
  }
    console.log("Sign up with:", data);
  }

  return (
    <main className="py-10 w-max-4xl mx-auto ">
     {isVerify? <div className="w-full max-w-md mx-auto space-y-6 border p-10 rounded-xl shadow-xl text-center">
        <p className="text-sm">
          Please verify your account and then <Link href="/api/auth/signin" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div> : <div className="w-full max-w-md mx-auto space-y-6 border p-10 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
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
                    <Input type="password" placeholder="********" {...field} />
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
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>
        <div className ="text-center items-center text-slate-500 flex gap-2">
        <div className="w-1/2 h-[1px] bg-slate-400"></div>
        <div>or</div>
        <div className="w-1/2 h-[1px] bg-slate-400"></div>
        </div>
        <div className="space-y-2">
        <Button variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4" /> Sign in with Google
          </Button>

          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" /> Sign in with GitHub
          </Button>
         
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm">
          <span>Already have an account?</span> <Link
              href="/api/auth/signin"
              className="text-blue-600 hover:underline"
            >
              Sign 
            </Link>
          </p>
        </div>
      </div>}
    </main>
  );
};

export default SignUpForm;
