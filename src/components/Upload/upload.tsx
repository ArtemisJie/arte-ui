import React, { ChangeEvent, FC, ReactNode, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/button";
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
    targetLink: string;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any }; //axios
    name?: string; //axios
    data?: { [key: string]: any }; //axios
    withCredentials?: boolean; //cookie?
    accept?: string; //'.jpg or .png ...
    multiple?: boolean; //upload more files
    drag?: boolean;
    children?:ReactNode;
}

const Upload: FC<UploadProps> = (props) => {

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
        let postFiles = Array.from(files)
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
        let _file: UploadFile = {
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
                let percentage = Math.round((e.loaded * 100) / (e.total as number)) || 0;
                updateFilelist(_file, { percentage: percentage, status: 'uploading' })
                if (percentage < 100) { //展示进度条
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(res => {
            console.log(res);
            updateFilelist(_file, { status: 'success', response: res.data })
            if (onSuccess) {
                onSuccess(res.data, file)
            }
            if (onChange) {
                onChange(file)
            }

        }).catch(err => {
            updateFilelist(_file, { status: 'error', response: err.data })
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }
    return (
        <div className="upload-component">

            <div className="upload-input"
                style={{ display: 'inline-block' }}
                onClick={handleClick}>
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
export default Upload