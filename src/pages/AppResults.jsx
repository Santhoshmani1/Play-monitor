import React, { useEffect, useState } from 'react';
import Header from '../components/shared/Header';
import AppDetails from '../components/Apps/AppDetails';
import SimilarApps from '../components/Apps/SimilarApps';
import { useParams } from 'react-router-dom';

const AppResults = () => {
    const { appName } = useParams();

    const [appResults, setAppResults] = useState([]);
    const [topMatchAppId, setTopMatchAppId] = useState(null);
    const [similarApps, setSimilarApps] = useState([]);

    console.log(appResults);

    const fetchAppResults = () => {
        appName && fetch("https://gplayapi.vercel.app/search?term=" + appName)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setTopMatchAppId(data[0].appId);
                    setSimilarApps(data.slice(1, 6));
                    getAppDetails(data[0].appId);
                }
            })
            .catch(error => console.error(error));
    };

    const getAppDetails = (appId) => {
        fetch("https://gplayapi.vercel.app/app?appId=" + appId)
            .then(response => response.json())
            .then(data => setAppResults(data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchAppResults(appName);
    }, [appName]);

    return (
        <>
            <Header />
            <AppDetails details={appResults} />
            <SimilarApps apps={similarApps} />
        </>
    )
}

export default AppResults;