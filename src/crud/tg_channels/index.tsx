import React, { useCallback, useState } from 'react'
import {
    createCRUD,
    TextInput,
    SelectInput,
    FilePictureInput,
    FileField,
    EditorInput,
    ArrayInput,
    TimePickerInput,
    BooleanInput,
    DraggerInput,
    DatePickerInput,
    AjaxSelectInput,
    SlugInput,
    RadioInput,
    DateRangePickerInput,
    useDataProvider,
    Select,
} from '@devfamily/admiral'
import api from '@/src/config/api'
import { VscError } from 'react-icons/vsc'

const onImageUpload = (file: Blob) => {
    return api.editorImageUpload('editorUpload', { file })
}

const resource = 'tg_channels'
const path = '/tg_channels'

export const CRUD = createCRUD({
    path,
    resource,
    actions: <></>,
    index: {
        title: 'Товары',
        newButtonText: 'Создать товар',
        tableColumns: [
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
                width: 90,
            },
            {
                title: 'Цена',
                dataIndex: 'price',
                key: 'price',
                width: 90,
                // sorter: true,
            },
            {
                title: 'Описание',
                dataIndex: 'description',
                key: 'description',
                width: 250,
            },
            {
                title: 'Активный',
                dataIndex: 'active',
                key: 'active',
                width: 100,
                render: (value, record) => (
                    <StatusField resource={resource} id={record.id} value={value} />
                ),
                // render: (value) => (value ? 'Yes' : 'No'),
            },
        ],
        tableActions: null,
        // tableConfig: { dndRows: true },
    },
    // filter: {
    //     topToolbarButtonText: 'Filter',
    //     fields: (
    //         <>
    //             <TextInput label="Name" name="name" placeholder="Name" />
    //             <AjaxSelectInput
    //                 label="Role"
    //                 name="role"
    //                 placeholder="Choose Role"
    //                 fetchOptions={(field, query) =>
    //                     api.getAjaxSelectOptions(resource, field, query)
    //                 }
    //             />
    //             <BooleanInput label="Active?" name="active" />
    //             <TimePickerInput label="Time" name="time" placeholder="Time" format="HH:mm" />
    //             <DateRangePickerInput label="Date" name="date" />
    //             <SelectInput label="Group" name="group" placeholder="Choose Group" mode="multiple">
    //                 <SelectInput.Option value="admin">Admins</SelectInput.Option>
    //                 <SelectInput.Option value="project_manager">
    //                     Project Managers
    //                 </SelectInput.Option>
    //             </SelectInput>
    //             <SelectInput label="Role 2" name="role 2" placeholder="Choose Role 2">
    //                 <SelectInput.Option value="accountant">Accountant</SelectInput.Option>
    //                 <SelectInput.Option value="recruiter">Recruiter</SelectInput.Option>
    //             </SelectInput>
    //         </>
    //     ),
    // },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label="Id" name="id" placeholder="Id" required />
                    <TextInput label="Name" name="name" placeholder="Name" />
                    <SlugInput label="Slug" name="slug" placeholder="Slug" from="name" />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Group"
                        name="group"
                        placeholder="Choose Group"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Administration</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Project managers
                        </SelectInput.Option>
                    </SelectInput>
                    <RadioInput label="Role" name="role" required />
                    <FilePictureInput
                        columnSpan={2}
                        label="Avatar"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
                    />
                    <DraggerInput
                        columnSpan={2}
                        label="Images"
                        name="images"
                        accept="image/*"
                        multiple
                    />
                    <EditorInput
                        columnSpan={2}
                        label="Description"
                        name="description"
                        onImageUpload={onImageUpload}
                    />
                    <ArrayInput label="Schedule" name="schedule" required>
                        <SelectInput
                            label="Day of the week"
                            name="day"
                            placeholder="Day of the week"
                            required
                        />
                        <TimePickerInput
                            label="Opening time"
                            name="start_time"
                            placeholder="Opening time"
                            format="HH:mm"
                        />
                        <TimePickerInput
                            label="Closing time"
                            name="end_time"
                            placeholder="Closing time"
                            format="HH:mm"
                        />
                        <BooleanInput label="Day off?" name="day_off" />
                    </ArrayInput>

                    <BooleanInput label="Active?" name="active" />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" />
                    <SlugInput label="Slug" name="slug" placeholder="Slug" from="name" disabled />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Group"
                        name="group"
                        placeholder="Choose Group"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Administration</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Project managers
                        </SelectInput.Option>
                    </SelectInput>
                    <AjaxSelectInput
                        label="Role"
                        name="role"
                        placeholder="Choose Role"
                        fetchOptions={(field, query) =>
                            api.getAjaxSelectOptions(resource, field, query)
                        }
                    />
                    <FilePictureInput
                        columnSpan={2}
                        label="Avatar"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
                    />
                    <DraggerInput
                        columnSpan={2}
                        label="Images"
                        name="images"
                        accept="image/*"
                        multiple
                    />
                    <EditorInput
                        columnSpan={2}
                        label="Description"
                        name="description"
                        onImageUpload={onImageUpload}
                    />
                    <ArrayInput label="Schedule" name="schedule" required>
                        <SelectInput
                            label="Day of the week"
                            name="day"
                            placeholder="Day of the week"
                        />
                        <TimePickerInput
                            label="Opening time"
                            name="start_time"
                            placeholder="Opening time"
                            format="HH:mm"
                        />
                        <TimePickerInput
                            label="Closing time"
                            name="end_time"
                            placeholder="Closing time"
                            format="HH:mm"
                        />
                        <BooleanInput label="Day off?" name="day_off" />
                    </ArrayInput>

                    <BooleanInput label="Active?" name="active" />
                </>
            ),
        },
    },
    create: {
        title: 'Create New User',
    },
    update: {
        title: (id: string) => `Edit User #${id}`,
        view: 'drawer',
    },
})

const StatusField: React.FC<{ resource: string; value?: boolean; id: number }> = ({
    resource,
    value,
    id,
}) => {
    const { update } = useDataProvider()
    const [active, setActive] = useState(value ?? false)

    const updateData = useCallback((values) => {
        return update(resource, { data: values, id })
    }, [])

    const onChange = (value: boolean) => {
        const prevValue = active
        setActive(value)
        updateData({ active: value }).catch(() => setActive(prevValue))
    }
    // debugger
    return (
        <Select size="S" defaultValue={active} onChange={onChange}>
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Inactive</Select.Option>
        </Select>
    )
}
