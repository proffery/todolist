import { ChangeEvent, KeyboardEvent, useState } from "react"

type AddItemPropsType = {
    callback: (title: string) => void
}

export const AddItemForm = (props: AddItemPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const usrMsgLengthTitle: boolean | JSX.Element = title.length > 15 && <p className="error">Your title too long!</p>
    const usMsgrEmptyError = error && <p className="error">Enter task title</p>
    const isAddButtonDisabled = title.length > 15 || title.length === 0
    
    const addTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isAddButtonDisabled) {
            addHandler()
        }
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        if (e.target.value.trimStart()) {
            setTitle(e.currentTarget.value)
        }
        else {
            setError(true)
            setTitle('')
        }
    }
    const addHandler = () => {
        props.callback(title)
        setTitle('')
    }

    return (
        <div>
            <input
                value={title.trim()}
                onKeyDown={addTaskOnEnterHandler}
                onChange={inputOnChangeHandler}
                placeholder="Please, start typing..."
                className={error ? "input-error" : ""}
            />
            <button
                onClick={addHandler}
                disabled={isAddButtonDisabled}
            >+</button>
            {usrMsgLengthTitle}
            {usMsgrEmptyError}
        </div>

    )
}