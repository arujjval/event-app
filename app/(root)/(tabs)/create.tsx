import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Button, Platform} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import GradientBg from '@/components/gradient-bg';
import { Back, SelectImage, Twitch, Youtube } from '@/assets/icons';
import { router } from 'expo-router';
import DateTimePicker from "@react-native-community/datetimepicker";
import { createEvent } from '@/lib/event/event';
import { useMutationApi } from '@/lib/useApi';

const AllTags = ['Tech', 'Music', 'Food', 'Sports', 'Art', 'Fashion', 
    'Health', 'Business', 'Science', 'Education', 'Travel', 'Film', 'Charity', 'Other'];

enum StreamingPlatform {
    Youtube = 'Youtube',
    Twitch = 'Twitch'
}

function Create() {
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [about, setAbout] = useState<string>('');
    const [tags, setTags] = useState<Array<string>>([]);
    const [LeftTags, setLeftTags] = useState<Array<string>>(AllTags);
    const [stream_platform, setStreamPlatform] = useState<StreamingPlatform | null>(null);
    const [link, setLink] = useState<string>('');

    const [on_date, setOnDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const { mutate, isPending, isError } = useMutationApi(createEvent);
    
    const onChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
        setOnDate(selectedDate);
        }
        setShowDatePicker(false);
        setShowTimePicker(false);
    };
    
    const handleTag = (tag: string) => {
        setTags(prevTags => {
            if (prevTags.includes(tag)) {
                return prevTags.filter(t => t !== tag);
            } else if (prevTags.length < 5) {
                return [...prevTags, tag];
            } else {
                return prevTags;
            }
        });

        setLeftTags(prevLeftTags => {
            if (tags.length === 5) {
                return prevLeftTags;
            }

            const newLeftTags = prevLeftTags.includes(tag)
                ? prevLeftTags.filter(t => t !== tag)
                : [...prevLeftTags, tag];
            return newLeftTags;
        });
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleCreateEvent = () => {
        console.log('Creating event');
        mutate({ title, about, on_date, on_time: on_date, streamer: 'streamer', tags, status: 'UPCOMING', stream_platform, link });
        
        if (isPending) {
            console.log('Loading...');
        }

        if(isError) {
            console.log('Error');
        }
    }

    return ( 
        <SafeAreaProvider className='w-full h-full'>
            <View className='w-full h-2/6 absolute top-0 left-0 z-1'>
                {image ? (
                    <View className='w-full h-full'>
                        <Image 
                            source={{ uri: image }} 
                            className='w-full h-full'
                        />
                        <View className='absolute top-0 left-0 w-full h-full bg-black opacity-50' />
                    </View>
                ) : (
                    <GradientBg />
                )}
            </View>

            <View className='w-full h-1/6 flex flex-row items-end pb-8'>
                <View className='flex-row items-center w-full justify-between px-5'>
                    <View className='rounded-full p-2 bg-gray-300/50'>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={Back} className='size-8' style={{ tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>
                    <Text className='font-poppins-semiBold text-white text-2xl flex-1 text-center pr-8'>
                        {!image && 'Create Event'}
                    </Text>
                </View>
            </View>

            {/* Header ends */}

            <View className='w-full h-full absolute z-2'>
                <View className={image?'h-1/4' : 'h-1/6'}></View>
                <ScrollView 
                    className='w-full h-full bg-white rounded-t-2xl'
                    contentContainerClassName='flex flex-col gap-10 mx-4 mt-10 pb-32'>
                    <View className='flex flex-col gap-5'>
                        <Text className='text-gray-800 font-poppins-medium'>
                            Upload a cover image
                        </Text>
                        <View className='flex flex-row items-center gap-10'>
                            <TouchableOpacity onPress={pickImage} className=' bg-gray-800 
                                p-4 rounded-full'>
                                <Image source={SelectImage} 
                                    className='size-10' 
                                    style={{ tintColor: '#fff'}}/>
                            </TouchableOpacity>
                            {image && 
                            <TouchableOpacity 
                                onPress={() => setImage(null)}>
                                <Text className='font-poppins-light text-red-700'>
                                    Remove
                                </Text>
                            </TouchableOpacity>}
                        </View>
                    </View>

                    <View className='flex flex-col gap-1'>
                        <Text className='text-gray-800 font-poppins-medium'>
                        Event Title
                        </Text>
                        <TextInput
                            onChangeText={setTitle}
                            value={title}
                            placeholder='Your event title'
                            className="border border-gray-300 py-4 px-3 
                                rounded-3xl text-gray-800 font-poppins-regular"
                        />
                    </View>

                    <View className='flex flex-col gap-1'>
                        <Text className='text-gray-800 font-poppins-medium'>
                        About the event
                        </Text>
                        <TextInput
                            onChangeText={setAbout}
                            value={about}
                            placeholder='What is your event about?'
                            className='border border-gray-300 py-4 px-3 
                                rounded-3xl text-gray-800 font-poppins-regular'
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    <View>
                        <Text className='font-poppins-medium text-gray-800 mb-2'>
                            Select relevant tags
                        </Text>
                        <View className='flex flex-row flex-wrap gap-2'>
                            {tags.map((tag) => (
                                <TouchableOpacity key={tag} onPress={() => handleTag(tag)}>
                                    <Text className='font-poppins-regular text-sm text-white
                                        bg-primary-400 px-3 py-1 rounded-full'>
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text className='font-poppins-regular text-gray-800 text-sm mt-1 mb-3'>
                            Select upto 5 tags.
                        </Text>

                        <View className='flex flex-row flex-wrap gap-2'>
                            {LeftTags.map((tag) => (
                                <TouchableOpacity key={tag} onPress={() => handleTag(tag)}>
                                    <Text className='font-poppins-regular text-sm text-gray-800
                                        bg-slate-300/60 px-3 py-1 rounded-full'>
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View>
                        <Text className='font-poppins-medium text-gray-800 mb-2'>
                            Event timings
                        </Text>
                        <View className='flex-row gap-16 justify-center mt-5'>
                            <TouchableOpacity 
                                className='bg-primary-200 py-2 px-8 rounded-full'
                                onPress={() => setShowDatePicker(true)}>
                                <Text className="font-poppins-semiBold text-white">
                                    Select Day
                                </Text>
                            </TouchableOpacity>
                            
                            {showDatePicker && (
                                <DateTimePicker 
                                value={on_date} 
                                mode="date" 
                                display={Platform.OS === "ios" ? "spinner" : "calendar"} 
                                onChange={onChange} 
                                minimumDate={new Date()}
                                />
                            )}


                            <TouchableOpacity 
                                className='bg-primary-200 py-2 px-8 rounded-full'
                                onPress={() => setShowTimePicker(true)}>
                                <Text className="font-poppins-semiBold text-white">
                                    Select Time
                                </Text>
                            </TouchableOpacity>

                            {showTimePicker && (
                                <DateTimePicker 
                                value={on_date} 
                                mode="time" 
                                display={Platform.OS === "ios" ? "spinner" : "default"} 
                                onChange={onChange} 
                                />
                            )}
                        </View>

                        <Text className='font-poppins-regular text-gray-700 text-center mt-5'>
                            Starts on{" "}
                            {on_date.toLocaleDateString("en-GB", {
                                weekday: "long",
                                day: "2-digit",
                                month: "short",
                                year: on_date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
                            })}{" "}
                            at{" "}
                            {on_date.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </Text>
                    </View>

                    <View className='flex flex-col gap-5'>
                        <Text className='font-poppins-medium text-gray-800'>
                            Choose your Streaming Platform
                        </Text>
                        <View className='flex-row gap-10 pl-1'>
                            <TouchableOpacity onPress={() => setStreamPlatform(StreamingPlatform.Youtube)}>
                                <Image source={Youtube} className='size-12'/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setStreamPlatform(StreamingPlatform.Twitch)}>
                                <Image source={Twitch} className='size-12'/>
                            </TouchableOpacity>
                        </View>

                        {stream_platform && 
                        <TextInput 
                            placeholder={`Enter your ${stream_platform} link`}
                            className='border border-gray-300 py-4 px-3 
                                rounded-3xl text-gray-800 font-poppins-regular'
                            onChangeText={setLink}
                            value={link}
                        />}
                    </View>

                    <View className='flex flex-row justify-center mt-10'>
                        <TouchableOpacity onPress={handleCreateEvent}>
                            <Text className='bg-primary-400 py-3 px-10 
                                rounded-full text-white font-poppins-bold'>
                                CREATE EVENT
                            </Text> 
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaProvider>
    )
}

export default Create