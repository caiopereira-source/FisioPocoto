import MenuTab from './components/menuTab';
import {useState} from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import Login from './components/Login'

export default function App() {
  const [user, setUser] = useState(null);

  const theme = {
    ...DefaultTheme,
    "colors": {
      "primary": "rgb(0, 106, 103)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(112, 247, 241)",
      "onPrimaryContainer": "rgb(0, 32, 31)",
      "secondary": "rgb(74, 99, 97)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(204, 232, 229)",
      "onSecondaryContainer": "rgb(5, 31, 30)",
      "tertiary": "rgb(73, 96, 123)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(209, 228, 255)",
      "onTertiaryContainer": "rgb(1, 29, 53)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(250, 253, 251)",
      "onBackground": "rgb(25, 28, 28)",
      "surface": "rgb(250, 253, 251)",
      "onSurface": "rgb(25, 28, 28)",
      "surfaceVariant": "rgb(218, 229, 227)",
      "onSurfaceVariant": "rgb(63, 73, 72)",
      "outline": "rgb(111, 121, 120)",
      "outlineVariant": "rgb(190, 201, 199)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(45, 49, 49)",
      "inverseOnSurface": "rgb(239, 241, 240)",
      "inversePrimary": "rgb(78, 218, 212)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(238, 246, 244)",
        "level2": "rgb(230, 241, 239)",
        "level3": "rgb(223, 237, 235)",
        "level4": "rgb(220, 235, 233)",
        "level5": "rgb(215, 232, 230)"
      },
      "surfaceDisabled": "rgba(25, 28, 28, 0.12)",
      "onSurfaceDisabled": "rgba(25, 28, 28, 0.38)",
      "backdrop": "rgba(41, 50, 49, 0.4)"
    }
  }

  return (
    //<PaperProvider theme={theme}>
     // {!user ? <Login changeStatus={(user) => setUser(user)} /> : <MenuTab/>}
    //</PaperProvider>
    <PaperProvider theme={theme}><MenuTab/></PaperProvider>
  );
}