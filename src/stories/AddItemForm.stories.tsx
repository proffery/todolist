import { Meta, StoryObj } from "@storybook/react";
import { AddItemForm } from "../AddItemForm";
import { ChangeEvent, memo, useState } from "react";
import TextField from "@mui/material/TextField";
import React from "react";
import IconButton from "@mui/material/IconButton";
import { AddBox } from "@mui/icons-material";
import { action } from '@storybook/addon-actions';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        },
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button clicked inside form')
    }
}

export const AddItemFormWithError = memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>("Title is required")

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label="Title"
            helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>
})

export const AddItemFormWithErrorStory: Story = {
    render: () => <AddItemFormWithError addItem={action('Button clicked inside form')} />
};

