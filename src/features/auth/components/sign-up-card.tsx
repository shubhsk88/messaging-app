import React from 'react';
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

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
type SignUpInput = {
  email: string;
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
  const onSubmit: SubmitHandler<SignUpInput> = (data) => console.log(data);

  console.log(watch('email'));

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSubmit(onSubmit)}>
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
