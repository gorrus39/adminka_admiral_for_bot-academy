import React from 'react'

const OpenModalButton = ({ selectedKeys }: { selectedKeys: Array<string | number> }) => {
    return (
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#sendMessageModal"
            disabled={selectedKeys.length === 0}
        >
            Рассылка
        </button>
    )
}

export { OpenModalButton }
