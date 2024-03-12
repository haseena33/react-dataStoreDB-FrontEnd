import { makeStyles } from "@mui/styles";
import remote from "../../assets/widget-images/remote.webp";
import selfi from "../../assets/widget-images/selfifirst.avif";
import smartphone from "../../assets/widget-images/smartphone.webp";
import { Box, Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
    container:{
        backgroundColor: "black",
        color:'white',
        paddingTop:'10px',
        margin:'auto',
        width:'90%',
        marginTop:"10px"
    },
    widgetCardsContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        padding: "5px",
        paddingBottom: '10px',
        '@media (max-width: 600px)': {
            gridTemplateColumns: "1fr",
        },
    },
    widgetCard: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto 1fr",
        overflow: "hidden",
        position: "relative",
        padding: "10px 20px 20px 20px"
    },

    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },

    contentContainer: {
        backgroundColor: "gray",
        maxWidth: "70%",
        position: 'sticky',
        marginTop: "-50px",
        marginLeft: "15px",
        padding: '16px',
        height: 'auto',
        minHeight: '80px',
        color: 'white',
        fontSize: '20px',
        lineHeight: '24px',
        fontFamily: 'roboto'
    },
    gadget: {
        fontFamily: 'Roboto',
        fontSize: '30px',
        color: 'white',
        background: 'black',

    }
}));

const WidgetCards = () => {
    const classes = useStyles();

    const images = [
        { id: 1, src: remote, alt: 'Amazon', content: "Control Your AC with Smartphone" },
        { id: 2, src: smartphone, alt: 'Apple', content: 'Check Your IMEI Number' },
        { id: 3, src: selfi, alt: 'Croma', content: 'Take Selfi With Smile' },
    ];

    return (
        <>
            <Box className={classes.container}>
                <Typography variant="h6" style={{paddingLeft:'40px'}}>Know Your Gadget</Typography>
                <Box className={classes.widgetCardsContainer}>
                    {images.map((image) => (
                        <Box key={image.id} className={classes.widgetCard}>
                            <Box >
                                <img src={image.src} alt={image.alt} className={classes.img} />
                            </Box>
                            <Box className={classes.contentContainer}>
                                <p>{image.content}</p>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default WidgetCards;
