import React from "react";
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonType, ButtonSize } from "../src/button";
import '@testing-library/jest-dom'
import { ButtonProps } from "../src/button";
//import { mock } from "node:test";


const testDefaultProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'diyBtn',
    onClick: jest.fn()
}

const testLinkProps: ButtonProps = {
    btnType: 'link',
    href: 'http://www.baidu.com',
    size: 'sm',
    onClick: jest.fn(),
    disabled: true
}

const testDisabledProps: ButtonProps = {
    btnType: 'default',
    size: 'sm',
    className: 'diyBtn',
    onClick: jest.fn(),
    disabled: true
}
describe('test Button component', () => {
    it('default btn', () => {
        const wrapper = render(<Button {...testDefaultProps} >DefaultLarge</Button>)
        const element = wrapper.getByText('DefaultLarge');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('diyBtn');
        expect(element.tagName).toEqual('BUTTON');
        fireEvent.click(element)
        expect(testDefaultProps.onClick).toHaveBeenCalled();
    })
    it('deferent props', () => {

    })
    it('link btn', () => {
        const wrapper = render(<Button {...testLinkProps} >LinkLarge</Button>)
        const element = wrapper.getByText('LinkLarge');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        fireEvent.click(element)
        expect(testLinkProps.onClick).toHaveBeenCalled();

    })
    it('disabled btn', () => {
        const wrapper = render(<Button {...testDisabledProps} >DefaultLarge</Button>)
        const element = wrapper.getByText('DefaultLarge') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-sm');
        expect(element.tagName).toEqual('BUTTON');
        expect(element.disabled).toBeTruthy()
        // fireEvent.click(element)
        // expect(testDisabledProps.onClick).toHaveBeenCalled();

    })
})