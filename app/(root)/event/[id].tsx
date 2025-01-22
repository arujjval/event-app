import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

function Event() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            { id }
        </View>
    )
}

export default Event