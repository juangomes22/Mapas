import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraButtonRight: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: 30,
        position: "absolute",
        bottom: 60,
        right: 32,
        backgroundColor: 'green',
        elevation: 5
    },
    camera: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    cameraButtonLeft: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: 30,
        position: "absolute",
        bottom: 60,
        left: 32,
        backgroundColor: 'green',
        elevation: 5
    },
    markerImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    markerImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'green',
        justifyContent: "center",
        alignItems: "center"
    },
    cardStyle: {
        backgroundColor: 'white',
        height: 510,
        position: 'absolute',
        top: 32,
        right: 16,
        left: 16,
        borderRadius: 7,
        elevation: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    cardButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'green',
        elevation: 5
    },

    containerChat: {
        
        
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingLeft: 16,
    },
    containerMessage: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 180,
        width: '100%',
    },
    containerReverse: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 16,
        width: '100%',
    },
    containerMessageReverse: {
        backgroundColor: 'white',
        alignItems: 'flex-end',
        marginVertical: 4,
        width: '100%',
    },

    containerLogin: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

});