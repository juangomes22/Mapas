import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { getStoredData, setStoredData } from "../shared/secure-store-service";

export default function LoginPage({ navigation }) {
    const [author, setAuthor] = useState('');

useEffect(() =>{
    getAuthor();
}, []);

    async function getAuthor(){
        const localAuthor = await getStoredData('author');
        if(localAuthor){
            navigation.navigate('homepage');
        }
    }

    function login(){
        setStoredData('author', author);
        navigation.navigate('homepage');
    }

    return (
        <View style={styles.container}>
            <View style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 16
            }}>
                <Image source={require('../../assets/logo.png')} style={{ width: 200, height: 200,marginTop:180 }} />
                <View style={{flex:1.5}}></View>
                <View style={{flex:1, width:'90%', marginHorizontal:16}}>
                    <TextInput placeholder="Digite seu nome de usuário "
                        onChangeText={setAuthor}
                        value={author}
                        style={{
                            backgroundColor:'#d3d3d3',
                            padding:8,
                            borderRadius:8,
                            marginBottom:32
                        }}/>
                    <Button title="Entrar" onPress={login} />
                </View>

            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logo:{
        width:100,
        height:100,
        resizeMode:"cover",
        borderRadius:50,
        flex: 1
    },

});