import type { Meta, StoryFn } from "@storybook/react";
import { Button } from "../src/Button";
import { Heading } from "../src/Content";
import { Dialog, DialogTrigger } from "../src/Dialog";
import { Modal } from "../src/Modal";
import { TextField } from "../src/TextField";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryFn<typeof Dialog>;

export const Example: Story = (args) => (
  <DialogTrigger>
    <Button>Sign up…</Button>
    <Modal>
      <Dialog {...args}>
        <form>
          <Heading slot="title">Sign up</Heading>
          <TextField
            autoFocus
            label="First Name"
            placeholder="Enter your first name"
          />
          <TextField label="Last Name" placeholder="Enter your last name" />
          <Button slot="close" style={{ marginTop: 8 }}>
            Submit
          </Button>
        </form>
      </Dialog>
    </Modal>
  </DialogTrigger>
);
