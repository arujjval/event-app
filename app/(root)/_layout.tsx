import { Redirect, Slot } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

function RootLayout() {
    return (
        <Slot />
    );
}

export default RootLayout