import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './fonts/fonts.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import appTheme from './themes/appTheme.ts'
import { ThemeProvider } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
	
	<ThemeProvider theme={appTheme}>
		<Provider store={store}>
				<App />
		</Provider>
	</ThemeProvider>
)
