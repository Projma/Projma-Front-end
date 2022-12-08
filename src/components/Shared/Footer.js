import * as React from "react";

const Footer = () => {
  return (
      <p className="text-center" style={ FooterStyle }>Designed By Projma</p>
  )
}

const FooterStyle = {
  background: "#222",
  fontSize: ".8rem",
  color: "#fff",
  position: "absolute",
  bottom: 0,
  padding: "1rem",
  margin: 0,
  width: "100%",
  opacity: ".5"
}

export default Footer;