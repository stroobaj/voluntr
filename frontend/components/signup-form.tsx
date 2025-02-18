import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import React from 'react';
import { Button } from '@/components/ui/button';

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Voluntr</CardTitle>
          <CardDescription>
            Enter your information below to signup for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  required
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                required
              />
            </LabelInputContainer>

            <Button
              // className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              className="w-full"
              type="submit"
            >
              Sign up &rarr;
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};
