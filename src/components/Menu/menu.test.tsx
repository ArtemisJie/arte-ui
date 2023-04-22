import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
}

const TestMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index={0}>
                active
            </MenuItem>
            <MenuItem index={1} disabled>
                disabled
            </MenuItem>
            <MenuItem index={2}>
                third
            </MenuItem>
        </Menu>
    )
}


let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe("menu and menuItem test", () => {

    beforeEach(() => { //*这样可以避免在每个case中重复声明定义wrapper之类的语句
        wrapper = render(TestMenu(testProps))
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled')

    })
    it('default', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('is-disabled')

    })
    it('click items should change active and call the right cb', () => {
        const thirdItem = wrapper.getByText('third');
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith(2)
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    })
    it('render vertical menu', () => {
      //  const 
    })
})