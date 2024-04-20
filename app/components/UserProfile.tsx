import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
interface UserCardProps {
    name: string;
    userName: string;
    onEditPress: () => void;
}

const UserProfile: React.FC<UserCardProps> = ({ name, userName, onEditPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.username}>{`@${userName}`}</Text>
            </View>
            <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
                <Ionicons name="pencil" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
    },
    content: {
        flex: 1,
        marginRight: 16,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    username: {
        fontSize: 14,
        color: '#888',
    },
    editButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
});

