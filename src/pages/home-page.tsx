import { useEffect, useState } from "react";
import { View, Text, TouchableNativeFeedback, Image, TextInput, Alert } from "react-native";
import { Icon } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from "../styles/styles";
import PlaceEntity from "../entities/place-entity";
import CoordinateEntity from "../entities/coordinate-entity";
import * as Location from 'expo-location'
import { onValue, push, ref, remove, update } from "firebase/database";
import { db } from "../../firebase-config";
import { getStoredData } from "../shared/secure-store-service";

export default function HomePage({ navigation }) {

    var region;
    const [currentPlace, setCurrentPlace] = useState<PlaceEntity>();
    const [mapRef, setMapRef] = useState(null);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [places, setPlaces] = useState<PlaceEntity[]>([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        getAll();
        initMap();
    }, []);

    async function initMap() {
        const position = await getCurrentPosition();



        if (position) {
            if (mapRef) {
                mapRef.animateToRegion({
                    latitude: position.latitude,
                    longitude: position.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.05,
                }, 1000);

            } else {

            }
        }
    }

    async function getCurrentPosition(): Promise<CoordinateEntity> {

        const permission = await Location.requestForegroundPermissionsAsync();

        if (permission.granted) {
            const location = await Location.getCurrentPositionAsync();
            if (location) {
                const CoordinateEntity = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }
                return CoordinateEntity;
            } else {
                return null
            }
        }
    }

    async function addItem(imageUrl: string) {
        const position = await getCurrentPosition();

        if (position) {
            const newItem: PlaceEntity = {
                id: Math.random().toString(),
                imagePath: imageUrl,
                description: '',
                photoDate: Date().toString(),
                coords: {
                    latitude: position.latitude,
                    longitude: position.latitude,
                },
                title: '',
                author: await getStoredData('author')
            }


            setModalVisibility(false);
            setPlaces((places) => [...places, newItem]);
            push(ref(db, '/places'), newItem);
        }
    }

    async function getAll() {
        return onValue(ref(db, '/places'), (snapshop) => {
            try {
                setPlaces([]);
                if (snapshop) {
                    snapshop.forEach((childSnapshot) => {
                        const childKey = childSnapshot.key;
                        let childValue = childSnapshot.val();
                        childValue.id = childKey;
                        setPlaces((places) => [...places, (childValue as PlaceEntity)]);
                    });
                }
            } catch (error) {
                console.log(error);
            }
        });
    }

    async function updateItem() {
        currentPlace.description = description;
        update(ref(db, '/places/' + currentPlace.id), currentPlace);
        setModalVisibility(false);
        setCurrentPlace(null);
    }

    async function removeItem() {
        setModalVisibility(false);
        setCurrentPlace(null);
        remove(ref(db, '/places/' + currentPlace.id));
    }

    function showConfirmDialog() {
        return Alert.alert(
            "Deseja remover o local?",
            "Esta ação não poderá ser desfeita",
            [
                {
                    text: "sim",
                    onPress: () => removeItem()
                },
                {
                    text: "Não",
                }
            ]
        )
    }
    return (
        <View>
            <MapView
                style={{ height: '100%', width: '100%' }}
                ref={(map) => {
                    setMapRef(map);
                    initMap();
                }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={false}
                toolbarEnabled={false}
            >
                {

                    places.map((place) => {
                        console.log('Montando este item', place)
                        return (

                            <Marker
                                key={place.id}
                                id={place.id.toString()}
                                coordinate={{
                                    latitude: place.coords.latitude,
                                    longitude: place.coords.longitude,
                                }}
                                onPress={() => {
                                    setCurrentPlace(place);
                                    setModalVisibility(true);
                                }}
                                description={place.description}>
                                <View style={styles.markerImageContainer}>
                                    <Image source={{ uri: place.imagePath }} style={styles.markerImage} />
                                </View>
                            </Marker>
                        )
                    })
                }

            </MapView>
            <View style={styles.cameraButtonRight}>
                <TouchableNativeFeedback onPress={() => { navigation.navigate('camera', { callback: (imageUrl) => addItem(imageUrl) }) }}>
                    <Icon name='photo-camera' type='google' color='white' size={30} />
                </TouchableNativeFeedback>
            </View>
            {modalVisibility ?
                <View style={styles.cardStyle}>
                    <TouchableNativeFeedback onPress={() => (navigation.navigate('place', { place: currentPlace }))}>
                        <Image source={{ uri: currentPlace.imagePath }} style={{ width: '100%', maxHeight: 400, aspectRatio: 1 }} />
                    </TouchableNativeFeedback>

                    {
                        currentPlace.description !== '' ?
                            <Text style={{ fontSize: 17, marginTop: 16 }}>{currentPlace.description}</Text> :
                            <View style={{ alignItems: 'center', marginTop: 16, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput placeholder="Digite aqui a descrição"
                                    onChangeText={setDescription}
                                    style={{
                                        height: 40,
                                        marginRight: 8,
                                        borderRadius: 8,
                                        flex: 1,
                                        backgroundColor: '#8786867d',
                                        paddingHorizontal: 8
                                    }}>
                                </TextInput>
                                <View style={styles.cardButton}>
                                    <TouchableNativeFeedback onPress={() => {
                                        updateItem();
                                    }}>
                                        <Icon name='edit' type='google' color='white' size={15} />
                                    </TouchableNativeFeedback>
                                </View>
                            </View>
                    }


                    <View style={{ marginTop: 16, width: '100%', flexDirection: 'row', justifyContent: "flex-end" }}>
                        <View style={styles.cardButton}>
                            <TouchableNativeFeedback onPress={() => {
                                showConfirmDialog();
                            }}>
                                <Icon name='delete' type='google' color='white' size={15} />
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        width: '100%',
                        marginBottom: 16,
                        justifyContent:"space-between",

                    }}>
                        <View style={{}}>
                            <Text>Data: {currentPlace.photoDate}</Text>
                            <Text>Autor: {currentPlace.author}</Text>
                        </View>
                        <View style={[styles.cardButton, {marginTop:20}]}>
                            <TouchableNativeFeedback onPress={() => {
                                navigation.navigate('chat', {place: currentPlace});
                            }}>
                                <Icon name='chat' type='google' color='white' size={15} />
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View> :
                <></>
            }
        </View>
    )
}


