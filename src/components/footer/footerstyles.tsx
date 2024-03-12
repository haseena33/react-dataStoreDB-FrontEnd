
import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles(() => ({
    root: {
        padding: '20px',
        color: 'white',
        position: 'relative',
        marginBottom: '0px',
        background: "black",
        bottom: "0px"
    },
    Box: {
        padding: '10px',
        marginRight: '10px'
    },
    title: {
        color: 'white',
        marginBottom: '10px',
        textAlign: 'left',

    },
    link: {
        color: 'black',
        textDecoration: 'none',


    },
    centerText: {
        textAlign: 'left',
        lineHeight: '30px'
    },
    socialIcon: {
        width: '40px',
        height: '40px',
        marginRight: '10px',
        cursor: 'pointer',
        textAlign: 'left'
    },
    neoStackContainer: {
        background: 'black',
        width: '100%',
        padding: '10px',
        textAlign: 'center',
        position: 'relative',
        bottom: "0px",
        color: 'white'
    },
    griditem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));