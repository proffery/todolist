import type { Meta, StoryObj } from '@storybook/react';
import { Task } from '../Task';
import { action } from '@storybook/addon-actions'
import React, { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    changeTitle: {
      action: 'clicked'
    },
    removeTask: {
      action: 'clicked'
    },
    changeTaskStatus: {
      action: 'clicked'
    },
  },
  args: {
    id: '1111', isDone: true, title: 'JS'
  },
}

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
  args: {
    id: '2222', isDone: false, title: 'HTML'
  },
};

const InteractiveTask = () => {
  const [task, setTask] = useState({
    id: '1111', isDone: true, title: 'JS'
  })

  const changeTaskStatus = () => {
    return setTask({...task, isDone: !task.isDone})
  }

  const changeTitle = (title: string) => {
    return setTask({...task, title: title})
  }

  return <Task
    changeTaskStatus={changeTaskStatus}
    removeTask={action('')}
    changeTitle={changeTitle}
    id={task.id}
    isDone={task.isDone}
    title={task.title}
  />
}

export const TaskStory: Story = {
  render: () => <InteractiveTask />
}