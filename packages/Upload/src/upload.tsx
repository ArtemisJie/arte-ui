import React, { ChangeEvent, FC, ReactNode, useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile { //因为上传文件列表我们需要一个一个展示出来，所以另外定义一个接口UploadFile
    fid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percentage?: number;
    raw?: File;
    response?: unknown;
    error?: unknown;
}

export interface UploadProps {
    /**必选参数, 上传的地址 */
    targetLink: string;
    /**上传的文件列表,*/
    defaultFileList?: UploadFile[];
    /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**文件上传时的钩子 */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /**文件上传成功时的钩子 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /**文件上传失败时的钩子 */
    onError?: (err: any, file: UploadFile) => void;
    /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
    onChange?: (file: UploadFile) => void;
    /**文件列表移除文件时的钩子 */
    onRemove?: (file: UploadFile) => void;
    /**设置上传的请求头部 */
    headers?: { [key: string]: any };
    /**上传的文件字段名 */
    name?: string;
    /**上传时附带的额外参数 */
    data?: { [key: string]: any };
    /**支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    /**可选参数, 接受上传的文件类型 */
    accept?: string;
    /**是否支持多选文件 */
    multiple?: boolean;
    /**是否支持拖拽上传 */
    drag?: boolean;
    children?: React.ReactNode
}

export const Upload: FC<UploadProps> = (props) => {

    const {
        targetLink,
        onProgress,
        onSuccess,
        onError,
        beforeUpload,
        onChange,
        onRemove,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        drag,
        children,
        ...restProps
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const updateFilelist = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(preList => {
            return preList.map(file => {
                if (file.fid === updateFile.fid) {
                    return { ...file, ...updateFile }
                } else {
                    return file
                }
            })
        })
    }
    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }
    //选择上传文件类型
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return
        } uploadFiles(files)
    }
    const handleRemove = (file: UploadFile) => {
        //当上传失败时，点击叉号移除这个文件
        setFileList((preList) => {
            return preList.filter(item => item.fid !== file.fid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files)
        postFiles.map(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result === true) post(file)
            }
        })
    }
    const post = (file: File) => {
        const _file: UploadFile = {
            fid: Date.now().toString(),
            status: 'ready',
            size: file.size,
            name: file.name,
            percentage: 0,
            raw: file,
        }
        setFileList([_file, ...fileList])
        const formData = new FormData()
        formData.append(name || 'file', file)
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(targetLink, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                const percentage = Math.round((e.loaded * 100) / (e.total as number)) || 0;
                updateFilelist(_file, { percentage: percentage, status: 'uploading' })
                if (percentage < 100) { //展示进度条
                    if (onProgress) {
                        onProgress(percentage, _file)
                    }
                }
            }
        }).then(res => {
            console.log(res);
            updateFilelist(_file, { status: 'success', response: res.data })
            if (onSuccess) {
                onSuccess(res.data, _file)
            }
            if (onChange) {
                onChange(_file)
            }

        }).catch(err => {
            updateFilelist(_file, { status: 'error', response: err.data })
            if (onError) {
                onError(err, _file)
            }
            if (onChange) {
                onChange(_file)
            }
        })
    }
    return (
        <div className="upload-component">
            <div className="upload-input"
                style={{ display: 'inline-block' }}
                onClick={handleClick}
            >
                {drag ?
                    <Dragger onFile={(files) => { uploadFiles(files) }}>
                        {children}
                    </Dragger> :
                    children
                }
                <input
                    className="file-input"
                    style={{ display: 'none' }}
                    ref={inputRef}
                    onChange={handleFileChange}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}
Upload.defaultProps = {
    name: 'file'
}
export default Upload;