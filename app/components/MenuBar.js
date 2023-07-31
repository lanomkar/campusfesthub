import React, { useContext, useEffect, useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { AuthContext } from "../context/auth";

import { Dropdown, Icon } from "semantic-ui-react";

const trigger = (
  <span>
    <Icon name="user" />
  </span>
);

function MenuBar() {
  const { pathname } = useRouter();
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  const [activeItem, setActiveItem] = useState(pathname);

  const handleItemClick = (name) => {
    setActiveItem(name);
    router.push(name);
  };

  const clickedOnLogout = () => {
    logout();
    router.push("/auth/signin");
  };

  const options = [
    // {
    //   key: "user",
    //   text: (
    //     <span>
    //       Signed in as <strong>Bob Smith</strong>
    //     </span>
    //   ),
    //   disabled: true,
    // },
    // { key: "profile", text: "Your Profile" },
    // { key: "stars", text: "Your Stars" },
    // { key: "explore", text: "Explore" },
    {
      key: "my-fests",
      text: (
        <div
          style={{
            padding: "0.78571429em 1.14285714em",
          }}
          onClick={() => handleItemClick("/me/fests")}
        >
          My Fests
        </div>
      ),
    },
    {
      key: "createfest",
      text: (
        <div
          style={{
            padding: "0.78571429em 1.14285714em",
          }}
          onClick={() => handleItemClick("/me/createfest")}
        >
          Create Fest
        </div>
      ),
    },
    {
      key: "change-password",
      text: (
        <div
          style={{
            padding: "0.78571429em 1.14285714em",
          }}
          onClick={() => handleItemClick("/auth/changepassword")}
        >
          Change Password
        </div>
      ),
    },
    {
      key: "log-out",
      text: (
        <div
          style={{
            padding: "0.78571429em 1.14285714em",
          }}
          onClick={clickedOnLogout}
        >
          Logout
        </div>
      ),
    },
  ];

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal" className="main-menu">
      <Container>
        {/* <Link href="/me/fests"> */}
        <Menu.Item
          name={"FestBest.in"}
          as="a"
          active={activeItem === "/fests"}
          onClick={() => handleItemClick("/fests")}
        />
        {/* </Link> */}
        <Menu.Menu position="right">
          <Menu.Item
            name="My fests"
            as="a"
            active={activeItem === "/me/fests"}
            onClick={() => handleItemClick("/me/fests")}
          />
          {/*  <Menu.Item
            className="createFestMenuBar"
            name="Create fest"
            active={activeItem === "/me/createfest"}
            onClick={() => handleItemClick("/me/createfest")}
            as="a"
          />
          <Menu.Item name="logout" onClick={clickedOnLogout} /> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              marginLeft: "8px",
            }}
          >
            <Dropdown
              className="myDropdownmenu"
              trigger={trigger}
              options={options}
            />
          </div>
        </Menu.Menu>
      </Container>
    </Menu>
  ) : (
    <div>
      <Menu
        pointing
        secondary
        size="massive"
        color="teal"
        className="main-menu"
      >
        <Container>
          {/* <Link href="/fests"> */}
          <Menu.Item
            name="home"
            active={activeItem === "/" || activeItem === "/fests"}
            onClick={() => handleItemClick("/fests")}
            as="a"
            to="/"
          />
          {/* </Link> */}

          <Menu.Menu position="right">
            {/* <Link href="/auth/signin"> */}
            <Menu.Item
              name="login"
              active={activeItem === "/auth/signin"}
              onClick={() => handleItemClick("/auth/signin")}
              as="a"
            />
            {/* </Link> */}
            {/* <Link href="/auth/register"> */}
            <Menu.Item
              name="register"
              active={activeItem === "/auth/register"}
              onClick={() => handleItemClick("/auth/register")}
              as="a"
            />
            {/* </Link> */}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );

  return menuBar;
}

export default MenuBar;
