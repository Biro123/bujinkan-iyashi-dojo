import Alert from '@material-ui/lab/Alert';
import { useAlertState } from '../../globalState/alertState';

const AlertMessage = () => {
  const alertState = useAlertState();
  const alerts = alertState.get();
  
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert key={alert.id} severity={alert.alertType}>
        {alert.msg}
      </Alert>
    ))
  )
} 

export default AlertMessage;