"use client";
import { useEffect, useState } from "react";
import { DomainChecker } from "@/components/domain-checker";
import { StoreCreator } from "@/components/store-creator";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [availableDomain, setAvailableDomain] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDomainAvailable = (domain: string) => {
    setAvailableDomain(domain);
    setIsSuccess(false);
  };

  const handleSuccess = () => {
    setIsSuccess(true);
    setAvailableDomain(null);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container relative min-h-screen flex flex-col justify-center items-center p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create Your Store
          </h1>
          <p className="text-sm text-muted-foreground">
            Start by choosing your store domain
          </p>
        </div>

        <Card className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Store Created!</h2>
              <p className="text-muted-foreground">
                Your store is now being prepared. You&apos;ll receive a
                confirmation email shortly.
              </p>
              <Button
                onClick={() => {
                  setIsSuccess(false);
                  setAvailableDomain(null);
                }}
                variant="outline"
                className="mt-4"
              >
                Create Another Store
              </Button>
            </div>
          ) : (
            <>
              <DomainChecker onDomainAvailable={handleDomainAvailable} />
              {availableDomain && (
                <div className="mt-8">
                  <StoreCreator
                    domain={availableDomain}
                    onSuccess={handleSuccess}
                  />
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
