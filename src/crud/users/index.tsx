import {
    createCRUD,
    TextInput,
    PasswordInput,
    SelectInput,
    Button,
    Editor,
    UploadFile,
    UploadProps,
    Upload,
    DatePicker,
    AjaxSelectInput,
    BooleanInput,
    Pagination,
    Drawer,
    Tabs,
    Table,
} from '@devfamily/admiral'
import { FiEye, FiCameraOff } from 'react-icons/fi'

import React, {
    Dispatch,
    Reducer,
    SetStateAction,
    useCallback,
    useMemo,
    useReducer,
    useState,
} from 'react'
import { FiUpload } from 'react-icons/fi'
import './index.scss'
import { OpenModalButton } from './openModalButton'
import { WrapBootstrapForm } from './wrapBootstrapForm'
import _ from '@/src/config/request'
import api from '@/src/config/api'

const apiUrl = import.meta.env.VITE_API_URL
interface TgAccount {
    id: number
    created_at: string
    amount_payments: string
    last_utm: string
    username: string
    utms: { id: number; name: string }[]
    products: { id: number; name: string }[]
}
export const CRUD = createCRUD({
    // actions: <></>,
    path: '/users',
    resource: 'users',
    index: {
        title: 'Пользователи',
        newButtonText: 'Add',
        tableColumns: [
            {
                title: 'Дата регистрации',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
            },
            {
                title: '@Username',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'Сумма пополнений',
                dataIndex: 'amount_payments',
                key: 'amount_payments',
                sorter: true,
            },
            {
                title: 'Последняя UTM',
                dataIndex: 'last_utm',
                key: 'last_utm',
            },
        ],
        tableConfig: {
            rowSelection: {
                render: ({ selectedRowKeys }) => <RowSelection selectedKeys={selectedRowKeys} />,
            },
        },
        tableActions: {
            title: 'Действия',
            key: 'actions',
            fixed: 'right',
            width: 100,
            render: (_value, record: TgAccount) => {
                const [visible, show, close] = useDrawer()
                return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={show}
                            type="button"
                            view="clear"
                            size="S"
                            iconRight={<FiEye />}
                        />
                        <Drawer
                            visible={visible}
                            onClose={close}
                            title={`Пользователь  username - @${record.username} , db_id: ${record.id}`}
                            width={760}
                        >
                            <Tabs defaultActiveKey="1" type="card">
                                <Tabs.TabPane tab="Переходы по UTM" key="1">
                                    <InfoTabUtms {...record} />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Приобретённые продукты" key="2">
                                    <InfoTabProducts {...record} />
                                </Tabs.TabPane>
                            </Tabs>
                        </Drawer>
                    </div>
                )
            },
        },
    },
    form: {
        create: {
            fields: undefined,
            children: undefined,
        },
        edit: {
            fields: undefined,
            children: undefined,
        },
    },
    filter: {
        topToolbarButtonText: 'Фильтр',
        fields: (
            <>
                <AjaxSelectInput
                    label="UTM"
                    name="utms"
                    placeholder="Выберите UTM"
                    fetchOptions={(field, query) => api.getAjaxSelectOptions('utm', field, query)}
                />
                <AjaxSelectInput
                    label="Товары"
                    name="products"
                    placeholder="Выберите товар"
                    fetchOptions={(field, query) =>
                        api.getAjaxSelectOptions('product', field, query)
                    }
                />
            </>
        ),
    },
})

const WrapDatePicker = ({
    errors,
    value,
    onChange,
    setErrors,
}: {
    errors: string[]
    value: null | Date
    onChange: Dispatch<SetStateAction<null | Date>>
    setErrors: Dispatch<SetStateAction<never[]>> | Dispatch<SetStateAction<never[]>>
}) => {
    function handleChange(date: Date | null, dateString: string) {
        onChange(date)
        setErrors([])
    }
    return (
        <div style={{ position: 'relative' }}>
            <DatePicker
                onChange={handleChange}
                size="L"
                placeholder="Опционально. Введите время отправки"
                showTime
                style={{ zIndex: 1000 }}
                alert={errors.length != 0}
                value={value}
            />
            <div className="form-errors">{errors.join(', ')}</div>
        </div>
    )
}

const WrapUploader = ({ fileList, updateFileList, errors }: any) => {
    const isHide = fileList.length > 1
    return (
        <div style={{ position: 'relative' }}>
            <Upload fileList={fileList} onChange={updateFileList}>
                <div className="form-errors upload-file-errors">{errors.join(', ')}</div>
                <Button iconLeft={<FiUpload />} type="button" className={`${isHide && 'd-none'}`}>
                    Загрузить медиа
                </Button>
            </Upload>
        </div>
    )
}

const WrapEditor = ({
    value,
    onChange,
    errors,
    setErrors,
}: {
    value: string
    onChange: Dispatch<SetStateAction<string>>
    errors: any
    setErrors: any
}) => {
    const changeWithResetErrors = (value: string) => {
        onChange(value)
        setErrors([])
    }

    return (
        <div style={{ position: 'relative' }}>
            <Editor
                value={value}
                onChange={changeWithResetErrors}
                textareaName="messageText"
                init={{
                    toolbar: 'bold italic underline strikethrough',
                }}
                alert={errors.length > 0}
            />
            <div className="form-errors">{errors.join(', ')}</div>
        </div>
    )
}

function RowSelection({ selectedKeys }: { selectedKeys: Array<string | number> }) {
    const [text, setText] = useState('')
    const [errorsText, setErrorsText] = useState([])
    const [errorsFileList, setErrorsFileList] = useState([])
    const [fileList, updateFileList] = useReducer<
        Reducer<UploadFile[], { fileList: UploadProps['fileList']; file: UploadFile }>
    >((_state, { file, fileList }) => {
        setErrorsFileList([])
        return fileList || []
    }, [])
    const [sendTime, setSendTime] = useState<null | Date>(null)
    const [errorsSendTime, setErrorsSendTime] = useState([])

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const fetchData = async () => {
            const url = `${apiUrl}/send_tg_message`
            const data = { text, fileList, sendTime, user_ids: selectedKeys }
            const response = await _.postFD(url)({ data })
            if (response.errors) {
                const errors = response.errors
                if (errors.text) setErrorsText(errors.text)
                if (errors.fileList) setErrorsFileList(errors.fileList)
                if (errors.sendTime) setErrorsSendTime(errors.sendTime)

                alert(response.message)
            } else {
                alert(response.message)
                window.location.href = '/users'
            }
        }
        fetchData()
    }
    return (
        <div className="users-send-messages">
            <OpenModalButton selectedKeys={selectedKeys} />
            <WrapBootstrapForm onSubmit={onSubmit}>
                <WrapEditor
                    value={text}
                    onChange={setText}
                    errors={errorsText}
                    setErrors={setErrorsText}
                />
                <WrapUploader
                    fileList={fileList}
                    updateFileList={updateFileList}
                    errors={errorsFileList}
                />
                <WrapDatePicker
                    value={sendTime}
                    onChange={setSendTime}
                    setErrors={setErrorsSendTime}
                    errors={errorsSendTime}
                />
            </WrapBootstrapForm>
        </div>
    )
}

const useDrawer = (): [boolean, () => void, () => void] => {
    const [visible, setVisible] = useState(false)

    const show = useCallback(() => {
        setVisible(true)
    }, [])

    const close = useCallback(() => {
        setVisible(false)
    }, [])

    return [visible, show, close]
}

function InfoTabUtms(record: TgAccount) {
    return (
        <>
            {record.utms.map((utm, key) => (
                <>
                    <dd key={key}>{utm.name}</dd>
                </>
            ))}
        </>
    )
}

function InfoTabProducts(record: TgAccount) {
    return (
        <>
            {record.products.map((utm, key) => (
                <>
                    <dd key={key}>{utm.name}</dd>
                </>
            ))}
        </>
    )
}
