import React from "react";
import { Navbar as Nav, Link } from "@nextui-org/react";
import Toggle from "./Toggle/Toggle";

export default function Navbar({ children }) {
  const [variant] = React.useState("sticky");
  return (
    <Nav isBordered variant={variant}>
      <Nav.Content>
        <Nav.Link href="#">About</Nav.Link>
        <Nav.Link href="#">About</Nav.Link>
        <Nav.Link href="#">About</Nav.Link>
      </Nav.Content>
    </Nav>
  );
}
