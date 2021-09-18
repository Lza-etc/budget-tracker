import React from "react";
import {  ListGroup,Navbar,Nav} from "react-bootstrap";
import "./Leftbar.css";

const Leftbar = () => {
  return (
    <Navbar collapseOnSelect className="p-0 m-0" expand="md">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="flex-column min-vh-100 sidebar ">
          <Nav.Item>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav.Item>
          
          <Nav.Item>
            <Nav.Link href="/dashboard/weekly">Weekly Status</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/dashboard/monthly">Monthly Status</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/dashboard/setup">Set Monthly Budget</Nav.Link>
          </Nav.Item>
          <Nav.Item className='pt-2'> CATEGORIES
          <ListGroup defaultActiveKey="#link1" >
            {[
              "Transport",
              "Food & Beverages",
              "Clothes",
              "Online Shopping",
              "Grocery",
              "Education",
              "Bill Payments",
              "Rent",
              "Health",
              "Others"
            ].map((text) => (
              <ListGroup.Item className="pb-0 font_xs" action href="#link1" key={text}>
                {text}
              </ListGroup.Item>
            ))}
          </ListGroup>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Leftbar;