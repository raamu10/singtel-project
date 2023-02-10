import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PageLoader from './components/loader'
import reportWebVitals from './reportWebVitals';

import * as redux from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux/store';

//Bootstrap Style
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <PersistGate persistor={persistor} loading={<PageLoader isLoading={true} />} > */}
				<Suspense fallback={<PageLoader isLoading={true} />}>
					<App />
				</Suspense>
			{/* </PersistGate> */}
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
