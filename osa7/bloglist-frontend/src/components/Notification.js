import { Alert } from '@mui/material'

const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }

  if (type === 'error') {
    return <Alert severity='error' className="error">{message}</Alert>
  }
  return <Alert severity='success' className="notification">{message}</Alert>
}

export default Notification
