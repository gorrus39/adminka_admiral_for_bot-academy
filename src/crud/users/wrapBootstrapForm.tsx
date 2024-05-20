import React from 'react'

const WrapBootstrapForm = ({ onSubmit, children, viewClass }: any) => {
    return (
        <div
            className={`modal fade modal-xl ${viewClass}`}
            id="sendMessageModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <form className="modal-content" onSubmit={onSubmit}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Разослать сообщение
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body d-flex flex-column gap-4">{children}</div>
                    <div className="modal-footer mt-3">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Отмена
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Отправить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { WrapBootstrapForm }
