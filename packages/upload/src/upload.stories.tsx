import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from '@storybook/addon-actions'
import Icon from "@arte-ui/icon";
import Upload from "./upload";

const meta: Meta<typeof Upload> = {
    component: Upload,
    //👇 Enables auto-generated documentation for the component story
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Upload>

export const UploadFile: Story = {
    render: () => {
        return (
            <Upload
                targetLink="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={action('changed')}
                onRemove={action('removed')}
                name="fileName"
                multiple
                drag
            >
                <Icon icon="upload" size="5x" theme="secondary" />
                <br />
                <p>Drag file over to upload</p>
            </Upload>
        )
    }
}