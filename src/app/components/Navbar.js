"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../constants/styles";
import { usePathname } from "next/navigation";
import { NavLinks } from "../constants";
import { Icon } from "../../../public";

const Navbar = () => {
  const currentRoute = usePathname();

  return (
    <header>
      <div className={``}>
        <nav
          className={`${styles.paddingX} xl:max-w-full w-full fixed top-0 flex justify-between py-4 items-center navbar z-30 bg-transparent px-12`}
        >
          <div className={`w-1/2 flex justify-start`}>
            <Image src={Icon} alt="logo" className="w-[54px] h-[52px]" />
            <div className="font-playfair font-medium text-[20px] text-[#635BFF]/100 hover:text-[#0000FF] ml-2 flex items-center">
              <Link href={"/"}>SecuriTrade.</Link>
            </div>
          </div>
          <ul className="list-none sm:flex hidden justify-end items-center flex-1 pr-1">
            {NavLinks.map((nav, i) => (
              <li
                key={nav.id}
                className={`font-playfair font-normal cursor-pointer text-[14px] ${
                  i === NavLinks.length - 1 ? "mr-0" : "mr-10"
                } text-[#292929] hover:text-[#635BFF] mr-10 ${
                  currentRoute === `/#${nav.id}`
                    ? "border-b-4 border-black"
                    : "border-b-4 border-transparent"
                }`}
              >
                <Link href={nav.link}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
