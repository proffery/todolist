import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import styled from "styled-components"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"

type AddItemPropsType = {
    callback: (title: string) => void
}

export const AddItemForm = (props: AddItemPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [userMessage, setUserMessage] = useState<string>('')
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
    const TITLE_MIN_LENGTH = 1
    const TITLE_MAX_LENGTH = 15

    useEffect(() => {
        checkInputErrors()
    }, [title])

    useEffect(() => {
        resetErrors()
    }, [])

    const checkInputErrors = () => {
        if (title.length <= TITLE_MIN_LENGTH) {
            setError(true)
            setIsButtonDisabled(true)
            setUserMessage('Title too short!')
        } else if (title.length > TITLE_MAX_LENGTH) {
            setError(true)
            setIsButtonDisabled(true)
            setUserMessage('Title too long!')
        } else {
            setError(false)
            setIsButtonDisabled(false)
            setUserMessage('Type text here...')
        }
    }

    const resetErrors = () => {
        setError(false)
        setUserMessage('Type text here...')
    }

    const addTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !error) {
            addHandler()
        }
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        checkInputErrors()
        setTitle(e.currentTarget.value.trimStart())
        resetErrors()
    }
    const addHandler = () => {
        props.callback(title.trim())
        setTitle('')
        resetErrors()
    }


    return (
        <Stack direction={"row"}>
            <TextField
                error={error}
                label={userMessage}
                color={error ? "error" : "primary"}
                size={"small"}
                variant={"outlined"}
                value={title.trimStart()}
                onKeyDown={addTaskOnEnterHandler}
                onChange={inputOnChangeHandler}
                onFocus={checkInputErrors}
                onBlur={resetErrors}
            />

            <StyledButton
                onClick={addHandler}
                disabled={isButtonDisabled}
                variant={"contained"}
            >+</StyledButton>
        </Stack>

    )
}

const StyledButton = styled(Button)`
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
`