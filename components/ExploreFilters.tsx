import React, { useEffect, useState } from "react"
import { TouchableOpacity, View, Text, ScrollView } from "react-native"

function ExploreFilters({ filters } : { filters: string[] }) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([filters[0]]);

    const handleTouch = (filter: string) => {
        setSelectedFilters(prevSelectedFilters => {
            const newSelectedFilters = prevSelectedFilters.includes(filter)
                ? prevSelectedFilters.filter(f => f !== filter)
                : [...prevSelectedFilters, filter];
            return newSelectedFilters.length === 0 ? [filters[0]] : newSelectedFilters;
        });
    }
    
        
    return (
        <View className="flex flex-row items-center py-4">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
             className="flex-1"
             contentContainerClassName="flex flex-row items-center gap-2 pl-3">
                <View className="flex flex-row gap-2">
                    {selectedFilters.map((filter, index) => (
                        <TouchableOpacity key={index} className="bg-gray-900 min-w-20 h-10
                        rounded-full flex justify-center items-center px-4"
                        onPress={() => handleTouch(filter)}>
                            <Text className="text-white text-center font-poppins-semiBold">
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                <View className="h-full w-1 bg-gray-400 rounded-full"></View>

                <View className="flex flex-row gap-2">
                    {filters.filter(filter => !selectedFilters.includes(filter)).map((filter, index) => (
                        <TouchableOpacity key={index} className="bg-gray-200 min-w-20 h-10
                        rounded-full flex justify-center items-center px-4"
                        onPress={() => handleTouch(filter)}>
                            <Text className="text-black text-center font-poppins-semiBold">
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>  
        </View>
    )
}

export default ExploreFilters