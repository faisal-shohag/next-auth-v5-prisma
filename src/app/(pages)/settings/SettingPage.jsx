"use client"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@/lib/validation";
import { updateProfile } from "./actions";
import { useSession } from "next-auth/react";

const SettingPage = ({user}) => {
  const { toast } = useToast();
  const {data: session, update} = useSession()


  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user.name },
  });


  const onSubmit = async (data) => {
    try {
      const userData = await updateProfile(data);
      update({...userData})
      toast({ title: "Profile updated" });
    } catch (error) {
      toast({ variant: "destructive", description: error.message });
    }
  };

  return (
    <main className="px-3 py-10">
      <section className="mx-auto max-w-7xl space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-sm space-y-2.5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a username" {...field} />
                  </FormControl>
                  <FormDescription>Your public username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default SettingPage;
