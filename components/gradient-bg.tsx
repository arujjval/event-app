import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

function GradientBg() {
  return (
    <LinearGradient
            colors={['#562B4C', '#763B3C', '#EA7600']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.24, 1]}
            style={{ flex: 1 }}
            className='h-full w-full'
        />
  )
}

export default GradientBg