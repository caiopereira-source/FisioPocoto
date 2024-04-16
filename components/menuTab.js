import React from 'react'
import { ScrollView } from 'react-native'
import {Button, Card} from 'react-native-paper'
import {pt, registerTranslation } from 'react-native-paper-dates'
registerTranslation('pt', pt)
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet, Text} from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Icon from 'react-native-vector-icons/Feather';
import Products from './Products';
import DoctorRegistration from './doctorRegistration'


function HomeScreen({navigation}) { 
    return (
        <ScrollView style={StyleSheet.container}>
            <Card mode='contained' style={{marginHorizontal: '5%', marginVertical: '2%',}}>
                <Card.Title style={{marginVertical: '1.8%'}} title="Reabilite-se: Reserve sua consulta com um fisioterapeuta." titleStyle={{fontFamily: 'Roboto'}} titleVariant='titleMedium' titleNumberOfLines={2} />
                <Card.Cover style={{marginHorizontal: '2%'}} source={require('../assets/hero1.jpg')} />
                <Card.Actions>
                    <Button mode='contained' onPress={() => navigation.navigate('Agendamento')}>Agendar</Button>
                </Card.Actions>
            </Card>

            <Card style={{marginHorizontal: '5%', marginVertical: '2%'}}>
                <Card.Title style={{marginVertical: '1.8%'}} title="Cuide do seu corpo: Nossos profissionais são altamente qualificados" titleStyle={{fontFamily: 'Roboto'}} titleVariant='titleMedium' titleNumberOfLines={2} />
                <Card.Cover style={{marginHorizontal: '2%'}} source={require('../assets/hero2.jpg')} />
                <Card.Actions>
                    <Button>Saiba mais</Button>
                </Card.Actions>
            </Card>

            <Card style={{marginHorizontal: '5%', marginVertical: '2%'}}>
                <Card.Title style={{marginVertical: '1.8%'}} title="Respeite seu Tempo: Reserve momentos para seu autocuidado." titleStyle={{fontFamily: 'Roboto'}} titleVariant='titleMedium' titleNumberOfLines={2} />
                <Card.Cover style={{marginHorizontal: '2%'}} source={require('../assets/hero3.jpg')} />
                <Card.Actions>
                    <Button>Saiba mais</Button>
                </Card.Actions>
            </Card>
        </ScrollView>
    ); 
} 
 
function SchedulingScreen({navigation}) {

    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
        setOpen(false);
        setDate(params.date);
        },
        [setOpen, setDate]
  );

    return ( 
        <SafeAreaProvider>
            <View style={styles.container}> 
                <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                    Selecione uma data para a consulta
                </Button>
                <DatePickerModal
                locale="pt"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
                />
            </View>
        </SafeAreaProvider> 
    ); 
} 
 
function NotificationsScreen({navigation}) { 
    return ( 
        <Products></Products>
    ); 
}
function DoctorRegistrationScreen({navigation}) { 
        return ( 
            <DoctorRegistration></DoctorRegistration>
        ); 
} 
 
const Tab = createBottomTabNavigator(); 
 
export default function Menu() { 
    return ( 
        <NavigationContainer> 
            <Tab.Navigator 
                screenOptions={({ route }) => ({ 
                    tabBarIcon: ({ color, size }) => { 
                        let iconName; 
 
                        switch (route.name) { 
                            case 'Home': 
                                iconName = 'home'; 
                                break; 
                            case 'Agendamento': 
                                iconName = 'calendar'; 
                                break; 
                            case 'Notificações': 
                                iconName = 'bell'; 
                                break; 
                            case 'Médicos': 
                                iconName = 'users'; 
                                break; 
                            default: 
                                iconName = 'add-circle-outline'; 
                                break; 
                        } 
 
                        return <Icon name={iconName} size={size} color={color} />; 
                    }, 
                })} 
                tabBarOptions={{ 
                    activeTintColor: '#048480', 
                    inactiveTintColor: '#777', 
                    showLabel: true, 
                }} 
            > 
                <Tab.Screen name="Home" component={HomeScreen} /> 
                <Tab.Screen name="Agendamento" component={SchedulingScreen} />  
                <Tab.Screen name="Notificações" component={NotificationsScreen} />
                <Tab.Screen name="Médicos" component={DoctorRegistrationScreen} /> 
                </Tab.Navigator> 
        </NavigationContainer> 
    ); 
} 
 
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'scroll',
    }, 
    iconTabRound: { 
        width: 60, 
        height: 90, 
        borderRadius: 30, 
        marginBottom: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        elevation: 6, 
        shadowColor: '#9C27B0', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 5, 
    } 
}); 