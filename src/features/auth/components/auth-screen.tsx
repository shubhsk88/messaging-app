'use client';
import React, { useState } from 'react';
import { SignInFlow } from '../types';
import { SignInCard } from './sign-in-card';
import { SignUpCard } from './sign-up-card';

export const AuthScreen = () => {
  const [flow, setFlow] = useState<SignInFlow>('signIn');

  return (
    <div className="h-full flex items-center justify-center bg-[#5c3b58]">
      <div className="md:h-auto md:w-[420px]">
        {flow === 'signIn' ? (
          <SignInCard setState={setFlow} />
        ) : (
          <SignUpCard setState={setFlow} />
        )}
      </div>
    </div>
  );
};
