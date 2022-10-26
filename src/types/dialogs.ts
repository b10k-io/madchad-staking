interface IDialog {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

export interface IDialogWrapper extends IDialog {
    children: JSX.Element | JSX.Element[]
}

export interface IDepositDialog extends IDialog {
    // 
}

export interface IClaimDialog extends IDialog {
    roundIndex: number
}