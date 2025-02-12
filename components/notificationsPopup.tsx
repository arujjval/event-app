import { Bell } from "@/assets/icons";
import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Image, Pressable } from "react-native";

const notifications = [
    "Your event is starting soon!",
    "New comment on your event",
    "A user followed you",
];

const NotificationsPopup = ({ isVisible } : { isVisible: boolean }) => {
    return (
        <Modal transparent={true} visible={isVisible} animationType='slide'>
            <TouchableOpacity>
                
            </TouchableOpacity>
        </Modal>
    );
};

export default NotificationsPopup;
