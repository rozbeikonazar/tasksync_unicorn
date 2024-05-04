import { Alert } from '@mui/material';
import useAlert from "../utils/hooks/useAlert.js";
import "../styles/AlertPopup.css"

const AlertPopup = () => {
  const { text, type } = useAlert();
    if (text && type) {
        return (
          <div className="alert-popup-container"> 
            <Alert
              severity={type}
              sx={{
                position: 'absolute',
                zIndex: 10,
              }}
              className="alert-popup"
            >
              {text}
            </Alert>
          </div>
        );
  } else {
    return <></>;
  }
};

export default AlertPopup;