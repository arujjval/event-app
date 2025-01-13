import { Slot } from 'expo-router';
import React from 'react'
import SignIn from '../signIn';

export default function RootLayout() {
    if(true) {
        return (
            <SignIn />
        )
    }

  return (
    <Slot />
  );
}
