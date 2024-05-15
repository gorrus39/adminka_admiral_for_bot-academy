import { createCRUD, TextInput, PasswordInput, SelectInput, Button } from '@devfamily/admiral'
import React from 'react'

export const CRUD = createCRUD({
    path: '/users',
    resource: 'users',
    index: {
        title: 'Users',
        newButtonText: 'Add',
        tableColumns: [
            // { title: 'checkbox', dataIndex: 'checkbox', key: 'checkbox' },
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 90,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
            },
        ],
        tableConfig: {
            rowSelection: {
                render: ({ selectedRowKeys }) => <RowSelection selectedKeys={selectedRowKeys} />,
            },
        },
        tableActions: {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 140,
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        asdfasfd
                        {/* <CustomAction id={record.id}/> */}
                        {/* <DeleteAction resource={resource} id={record.id}/> */}
                    </div>
                )
            },
        },
    },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" required />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Role"
                        name="role"
                        placeholder="Role"
                        required
                        options={[
                            { label: 'Admin', value: 'admin' },
                            { label: 'User', value: 'user' },
                        ]}
                    />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" required />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Role"
                        name="role"
                        placeholder="Role"
                        required
                        options={[
                            { label: 'Admin', value: 'admin' },
                            { label: 'User', value: 'user' },
                        ]}
                    />
                </>
            ),
        },
    },
    create: {
        title: 'Create User',
    },
    update: {
        title: (id: string) => `Edit User #${id}`,
    },
    bottomContent: <div>asdf</div>,
})
function RowSelection({ selectedKeys }: { selectedKeys: Array<string | number> }) {
    const btnDisabled = selectedKeys.length === 0
    selectedKeys.length === 0

    const onClick = (action: string) => () =>
        alert(`${action} selected items with keys: ${selectedKeys.join(', ')}`)

    return (
        <div style={{ display: 'flex', gap: 'var(--space-m)' }}>
            <Button size="S" type="button" disabled={btnDisabled} onClick={onClick('Edit')}>
                Edit
            </Button>
            <Button size="S" type="button" disabled={btnDisabled} onClick={onClick('Delete')}>
                Delete
            </Button>
        </div>
    )
}
