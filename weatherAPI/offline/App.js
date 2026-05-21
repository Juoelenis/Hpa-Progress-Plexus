import React from 'react';
import WeatherApp from './WeatherApp';
import OfflinePage from './OfflinePage';

function App() {
    return (
        <div className="App">
            <OfflinePage />
            <WeatherApp />
        </div>
    );
}

export default App;
