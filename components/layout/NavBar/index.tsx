"use client";
import ThemeSwitcherButton from "@/components/buttons/ThemeSwitcherButton";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";
import styled from "styled-components";

const NavBar = () => {
  return (
    <div className="w-full border-b border-gray-300 dark:border-black h-[80px] bg-white dark:bg-black">
      <div className="mt-4">
        {" "}
        <ThemeSwitcherButton />
      </div>
    </div>
  );
};

export default NavBar;
