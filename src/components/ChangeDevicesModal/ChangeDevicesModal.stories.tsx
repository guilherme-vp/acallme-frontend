import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'

import { ChangeDevicesModal, ChangeDevicesModalProps } from './ChangeDevicesModal'

export default {
	title: 'ChangeDevicesModal',
	component: ChangeDevicesModal
} as Meta

const Template: Story<ChangeDevicesModalProps> = args => <ChangeDevicesModal {...args} />

export const basic = Template.bind({})

basic.args = {
	open: true,
	handleChangeDevice: device => console.log(device),
	onClose() {
		this.open = !this.open
	}
} as Partial<ChangeDevicesModalProps>
