import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import { Upload, UploadProps } from '../../Upload/src/upload'

jest.mock('../../Icon/src/icon.tsx', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  targetLink: "xxx.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('input[type="file"]') as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })
  it('upload process should works fine', async () => {
    const { queryByText, getByText } = wrapper
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({ 'data': 'cool' })
    waitFor(() => expect(uploadArea).toBeInTheDocument())
    waitFor(() => expect(fileInput).not.toBeVisible())
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'ready',
      name: 'test.png'
    }))
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'ready',
      name: 'test.png'
    }))

    //remove the uploaded file
    // expect(queryByText('times')).toBeInTheDocument()
    // fireEvent.click(getByText('times'))
    // expect(queryByText('test.png')).not.toBeInTheDocument()
    // expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
    //   raw: testFile,
    //   status: 'ready',
    //   name: 'test.png'
    // }))
  })
  it('drag and drop files should works fine', async () => {
    mockedAxios.post.mockResolvedValue({ 'data': 'cool' })
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    // const mockDropEvent = createEvent.drop(uploadArea)
    // Object.defineProperty(mockDropEvent, "dataTransfer", {
    //   value: {
    //     files: [testFile]
    //   }
    // })
    // fireEvent(uploadArea, mockDropEvent)
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile]
      }
    })
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
      // expect(wrapper.queryByText('check-circle')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: expect.any(Object),
      status: 'ready',
      name: 'test.png'
    }))
  })
})