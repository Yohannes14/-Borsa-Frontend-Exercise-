import { Image, StyleSheet, Text, View } from "react-native";


const UserCard = ({ item }: any) => (
    <View style={styles.card}>
        <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.avatar}
        />
        <View style={styles.userInfo}>
            <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
            <Text style={styles.username}>Username: @{item.userName}</Text>
            {item.isBuyer && <Text style={styles.buyerLabel}>Buyer</Text>}
        </View>
    </View>
);

export default UserCard;
const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userInfo: {
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    username: {
        fontSize: 14,
        marginBottom: 5,
    },
    buyerLabel: {
        fontSize: 12,
        color: 'green',
        marginTop: 5,
    },
});