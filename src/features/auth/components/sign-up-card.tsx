import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
type SignUpInput = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInput>();
  const { signIn } = useAuthActions();
  const [error, setError] = useState('');
  const onSubmitPassword: SubmitHandler<SignUpInput> = async (data) => {
    try {
      await signIn('password', { ...data, flow: 'signUp' });
    } catch {
      setError('Something went wrong, Please try again after sometime');
    }
  };

  console.log(watch('email'));

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSubmit(onSubmitPassword)}>
          <Input
            disabled={false}
            placeholder="Name"
            type="text"
            {...register('name', { required: true })}
            required
          />
          <Input
            disabled={false}
            placeholder="Email"
            type="email"
            {...register('email', { required: true })}
            required
          />

          <Input
            disabled={false}
            placeholder="Password"
            {...register('password', { required: true })}
            type="password"
            required
          />
          <Input
            disabled={false}
            placeholder="Confirm password"
            type="password"
            {...register('confirmPassword', { required: true })}
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            onClick={() => {}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={false}
            onClick={() => {}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{'   '}
          <span
            onClick={() => setState('signIn')}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
