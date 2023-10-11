import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}



const TestMenu = (props: MenuProps) => {
    return (
        <Menu {...props} >
            <MenuItem index={'0'}>
                active
            </MenuItem>
            <MenuItem index={'1'} disabled>
                disabled
            </MenuItem>
            <MenuItem index={'2'}>
                third
            </MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem index={'0'}>
                    drop1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
    .submenu {
        display:none;
    }
    .submenu.menu-opend {
        display:block;
    }
    `
    /* 
        创建一个style文件并返回
    */
    const style = document.createElement('style')
    style.type = 'test/css'
    style.innerHTML = cssFile
    return style

}


let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe("menu and menuItem test", () => {

    beforeEach(() => { //*这样可以避免在每个case中重复声明定义wrapper之类的语句
        wrapper = render(TestMenu(testProps))
        wrapper.container.append(createStyleFile())

        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled')


    })
    it('default', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('is-disabled')

    })
    it('click items should change active and call the right cb', () => {
        const thirdItem = wrapper.getByText('third');
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('render vertical menu', () => {
        cleanup();
        const wrapper = render(TestMenu(testVerProps))
        const menuItem = wrapper.getByTestId('test-menu');
        expect(menuItem).toHaveClass('menu-vertical')

    })
    it('should show dropdown items when hover on subMenu', () => {
        {
            /* 
            因为测试文件里是不存在，所以需要自己编写一下css，不然会报错
            */
        }
        //expect(wrapper.queryByText('drop1')).not.toBeVisible()

        const dropdownElement = wrapper.getByText('dropdown');
        fireEvent.mouseOver(dropdownElement)
        expect(wrapper.getByText('drop1')).toBeVisible()
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    })
    it('should vertical', () => {
        cleanup();
        const wrapper = render(TestMenu(testVerProps))
        wrapper.container.append(createStyleFile())
        expect(wrapper.getByText('drop1')).toBeVisible();
        const dropdownElement = wrapper.getByText('dropdown');
        fireEvent.click(dropdownElement)
        expect(wrapper.getByText('drop1')).toBeVisible();
    })
})