import {HealthCheckRating} from '../types';
import NetworkWifi1BarIcon from '@mui/icons-material/NetworkWifi1Bar';
import NetworkWifi2BarIcon from '@mui/icons-material/NetworkWifi2Bar';
import NetworkWifi3BarIcon from '@mui/icons-material/NetworkWifi3Bar';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
const HealthCheckEntryDetails = ({healthCheckRating}:{healthCheckRating: HealthCheckRating}) => {

    const healthLevelIcon =
        healthCheckRating === 0 ? <NetworkWifiIcon/>
        :healthCheckRating === 1 ? <NetworkWifi3BarIcon/> 
        :healthCheckRating === 2 ? <NetworkWifi2BarIcon/>
        :healthCheckRating === 3 ? <NetworkWifi1BarIcon/>
        :null;
    return (
        <>
            {healthLevelIcon}
        </>
    );
    
    };
    export default HealthCheckEntryDetails;