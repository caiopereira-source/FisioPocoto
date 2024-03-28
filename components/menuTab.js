import React from 'react'
import {Button} from 'react-native-paper'
import {pt, registerTranslation } from 'react-native-paper-dates'
/*registerTranslation('pt', {
    save: 'Salvar',
    selectSingle: 'Selecionar Data',
    selectMultiple: 'Selecionar Datas',
    selectRange: 'Selecionar Período',
    notAccordingToDateFormat: (inputFormat) =>
      `O Formato da data deve ser ${inputFormat}`,
    mustBeHigherThan: (date) => `A data deve ser após ${date}`,
    mustBeLowerThan: (date) => `A data deve ser antes de ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `A data deve ser entre ${startDate} - ${endDate}`,
    dateIsDisabled: 'Data Ocupada',
    previous: 'Próxima',
    next: 'Anterior',
    close: 'Fechar',
  })*/
  registerTranslation('pt', pt)
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet, Text} from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Icon from 'react-native-vector-icons/Feather';


function HomeScreen() { 
    return ( 
        <View style={styles.container}> 
            <Text></Text> 
        </View> 
    ); 
} 
 
function SchedulingScreen() {

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
                locale="en"
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
 
function NotificationsScreen() { 
    return ( 
        <View style={styles.container}> 
            <Text></Text> 
        </View> 
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
                </Tab.Navigator> 
        </NavigationContainer> 
    ); 
} 
 
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
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