"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeSchema } from "@/lib/schemas";
import { DEFAULT_STORE_VALUES } from "@/lib/constants";
import { api } from "@/lib/api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { useState } from "react";
import { z } from "zod";

type StoreCreatorProps = {
  domain: string;
  onSuccess: () => void;
};

export function StoreCreator({ domain, onSuccess }: StoreCreatorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      ...DEFAULT_STORE_VALUES,
      domain,
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof storeSchema>) {
    console.log("Store creation response:");
    setIsSubmitting(true);
    try {
      const response = await api.createStore(values);
      console.log("Store creation response:", response);
      if (response.success) {
        toast.success("Store created successfully", {
          description: `Your store ${values.name} is now live at ${values.domain}.expressitbd.com`,
        });
        onSuccess();
      } else {
        toast.error("Error creating store", {
          description: response.message || "Please try again",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: `An unexpected error occurred, ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input {...field} disabled className="flex-1" />
                    <span className="ml-2 whitespace-nowrap">
                      .expressitbd.com
                    </span>
                  </div>
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
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="contact@yourstore.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Create Store
        </Button>
      </form>
    </Form>
  );
}
