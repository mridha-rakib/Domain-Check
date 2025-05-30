"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { domainSchema } from "@/lib/schemas";
import { useDebouncedCallback } from "use-debounce";
import { api } from "@/lib/api";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

type DomainCheckerProps = {
  onDomainAvailable: (domain: string) => void;
};

export function DomainChecker({ onDomainAvailable }: DomainCheckerProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [availability, setAvailability] = useState<boolean | null>(null);

  const form = useForm<z.infer<typeof domainSchema>>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domain: "",
    },
  });

  const checkDomainAvailability = useDebouncedCallback(
    async (domain: string) => {
      if (!domain) {
        console.log("Domain is empty");
        setAvailability(null);
        return;
      }

      setIsChecking(true);
      try {
        const response = await api.checkDomain(domain);
        setAvailability(!response.taken);
        if (!response.taken) {
          onDomainAvailable(domain);
        }
      } catch (error) {
        console.error("Domain check failed:", error);
        setAvailability(null);
      } finally {
        setIsChecking(false);
      }
    },
    500
  );

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Domain</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="your store"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        checkDomainAvailability(e.target.value);
                      }}
                      className="pr-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isChecking && (
                        <Loader className="h-4 w-4 animate-spin" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {availability !== null && (
        <div
          className={`p-3 rounded-md ${
            availability
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <p className="font-medium">
            {availability ? "Domain is available!" : "Domain is already taken"}
          </p>
          <p className="text-sm mt-1">
            {availability
              ? `You can use ${form.watch("domain")}.expressitbd.com`
              : "Please try a different domain name"}
          </p>
        </div>
      )}
    </div>
  );
}
