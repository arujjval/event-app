import React, { useEffect, useState } from "react"
import { TouchableOpacity, View, Text, ScrollView } from "react-native"

function Filters({ filters } : { filters: string[] }) {
    const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);

    const handleTouch = (filter: string) => {
        setSelectedFilter(filter);
    }
    
    return (
        <View className="flex flex-row items-center py-4">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
             className="flex-1"
             contentContainerClassName="flex flex-row items-center gap-2 pl-3">
                <View className="flex flex-row gap-2">
                    {filters.map((filter, index) => (
                        <TouchableOpacity key={index} 
                        className={`min-w-20 h-10 rounded-full flex 
                            justify-center items-center px-4 ${selectedFilter === filter ? 
                                'bg-gray-900' : 'bg-gray-200'}`}
                        onPress={() => handleTouch(filter)}>
                            
                            <Text className={`text-center font-poppins-semiBold ${selectedFilter === filter ? 
                                'text-white' : 'text-black'}`}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>  
        </View>
    )
}

export default Filters
