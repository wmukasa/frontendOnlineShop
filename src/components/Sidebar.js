import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { CDBAccordion, CDBContainer } from "cdbreact";
import { NavLink } from 'react-router-dom';

//const Sidebar = () => {
function Sidebar(){
  const data = [
    {
      title: "T-Shirts",
      content: ` Maecenas et eros nec leo ultrices rhoncus eget ac odio.`,
    },
    
    {
      title: "Blouse",
      content: ` Maecenas et eros nec leo ultrices rhoncus eget ac odio.`,
    },
    {
      title: "Sweaters",
      content: ` Maecenas et eros nec leo ultrices rhoncus eget ac odio.`,
    },
    {
      title: "Dresses",
      content: ` Maecenas et eros nec leo ultrices rhoncus eget ac odio.`,
    },
    {
      title: "Bottoms",
      content: ` Maecenas et eros nec leo ultrices rhoncus eget ac odio.`,
    },
    ];
  return (
    <div style={{ display: 'flex', height: '55vh', overflow: 'scroll initial' }}>
      {/* <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            CATEGORIES
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas fa-tshirt">T-Shirts</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-shirt-long-sleeve">Blouse</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fad fa-tshirt">Sweaters</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas-solid fa-person-dress-simple">Dresses</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem  icon="fa-solid fa-people-pants">Bottoms</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-people-pants">Coats</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-people-pants">Hoodies and sweatshirts</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent> */}

        {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
          {/* </CDBSidebar> */}
      <CDBContainer>
          <CDBAccordion data={data} />
    </CDBContainer>
    

    </div>
    
  );
};

export default Sidebar;