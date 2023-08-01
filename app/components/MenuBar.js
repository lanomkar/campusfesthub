"use client";
import React, { useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { Dropdown, Icon } from "semantic-ui-react";

const trigger = (
  <span>
    <Icon name="user" />
  </span>
);

export default function MenuBar() {
  const { pathname } = useRouter();

  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.user,
  ]);
  console.log("MY ROUTE USER => ", route);
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(pathname);

  const handleItemClick = (name) => {
    setActiveItem(name);
    router.push(name);
  };

  const clickedOnLogout = () => {
    signOut();
    router.push("/auth");
  };

  const options = [
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

  const menuBar =
    route === "authenticated" ? (
      <Menu
        pointing
        secondary
        size="massive"
        color="teal"
        className="main-menu"
      >
        <Container>
          <Menu.Item
            name={"CampusFestHub"}
            as="a"
            active={activeItem === "/home"}
            onClick={() => handleItemClick("/home")}
          />

          <Menu.Item
            name={"Fests"}
            as="a"
            active={activeItem === "/fests"}
            onClick={() => handleItemClick("/fests")}
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="My fests"
              as="a"
              active={activeItem === "/me/fests"}
              onClick={() => handleItemClick("/me/fests")}
            />
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
            <Menu.Item
              name="CampusFestHub"
              active={activeItem === "/" || activeItem === "/home"}
              onClick={() => handleItemClick("/home")}
              as="a"
              to="/"
            />

            <Menu.Item
              name={"Fests"}
              as="a"
              active={activeItem === "/fests"}
              onClick={() => handleItemClick("/fests")}
            />

            <Menu.Menu position="right">
              <Menu.Item
                name="Sigin"
                active={activeItem === "/auth"}
                onClick={() => handleItemClick("/auth")}
                as="a"
              />
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    );

  return menuBar;
}
