import  { FC } from "react";
import Menu, { MenuProps } from "./menu";
import SubMenu, { subMenuProps } from "./subMenu";
import MenuItem, { MenuItemProps } from "./menuItem";
import '../styles/index.scss'

export type MenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>,
    SubMenu: FC<subMenuProps>
}

const TransMenu = Menu as MenuComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu