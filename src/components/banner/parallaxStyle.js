import {} from '../../pages/'


const parallaxStyle = {
    parallax: {
      height: "65vh",
      maxHeight: "1000px",
      overflow: "hidden",
      position: "relative",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      margin: "0",
      padding: "0",
      border: "0",
      alignItems: "center"
    },
    filter: {
      "&:before": {
        background: "rgba(0, 0, 0, 0.5)"
      },
      "&:after,&:before": {
        position: "absolute",
        zIndex: "1",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        content: "''"
      }
    },
    small: {
      height: "380px"
    }
  };
  
  export default parallaxStyle;
  