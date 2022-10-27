import { Dialog } from '@headlessui/react'
import { IWithdrawDialog } from '../../types/dialogs'
import DialogWrapper from './DialogWrapper'
import { FaCheckCircle, FaSpinner, FaSync, FaTimes } from "react-icons/fa"
import { FaArrowAltCircleDown } from "react-icons/fa"
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { contractAddress } from '../../constants'
import ERC20Staking from "../../abi/ERC20Staking.json"
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import { formatCommify, formatDuration } from '../../support/formatters'
import { TransactionError } from '@thirdweb-dev/sdk'

const tdClass = "text-sm text-right py-1 text-slate-900 border-slate-200"

function LoadingView() {
    return (
        <div className="flex flex-col gap-4 items-center text-center mb-8">
            <h4 className="text-sm text-slate-400 uppercase">Step 1 of 1</h4>
            <FaSpinner className="animate-spin h-6 w-6" />
            <h3 className="font-semibold uppercase text-slate-900">Withdrawing Tokens</h3>
            {/* <h4 className="font-semibold uppercase text-slate-900">{formatCommify(amount)}</h4> */}
            <p className="text-slate-400">Confirm this transaction in your wallet</p>
        </div>
    )
}

function ErrorView({ error, withdraw }: { error: unknown, withdraw: () => void }) {
    return (
        <div className="flex flex-col gap-4 items-center text-center mb-8">
            <h4 className="text-sm text-slate-400 uppercase">Error</h4>
            <h3 className="font-semibold uppercase text-red-900">Oops! Something went wrong.</h3>
            <p className="text-slate-400 w-full text-xs font-mono">
                {(error as TransactionError).toString()}
            </p>
            <button
                type="button"
                className="rounded-md border border-transparent bg-amber-100 px-6 py-3 text-amber-900 hover:bg-amber-200 w-full text-base font-semibold"
                onClick={withdraw}
            >
                <div className="flex items-center justify-center gap-2">
                    <FaSync className="h-4" />
                    <span>Try again</span>
                </div>
            </button>
        </div>
    )
}

function SuccessView() {
    return (
        <div className="flex flex-col gap-4 items-center text-center mb-8">
            <h4 className="text-sm text-slate-400 uppercase">Congratulations</h4>
            <FaCheckCircle className="text-emerald-500 h-6 w-6" />
            <h3 className="font-semibold uppercase text-emerld-900">Withdrew Tokens</h3>
            <p className="text-slate-400">Tokens have been transferred to your wallet.</p>
        </div>
    )
}

export default function WithdrawDialog({ depositIndex, isOpen, openModal, closeModal }: IWithdrawDialog) {

    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: deposit } = useContractRead(contract, "deposits", depositIndex)
    const { data: feeForDeposit } = useContractRead(contract, "feeForDeposit", depositIndex)
    const { mutateAsync: withdrawByDeposit, status, error } = useContractWrite(contract, "withdrawByDeposit");

    const { data: feeRate } = useContractRead(contract, "feeRate");
    const { data: feeCliff } = useContractRead(contract, "feeCliff");

    const [amount, setAmount] = useState<BigNumber>()

    async function withdraw() {
        await withdrawByDeposit([depositIndex])
    }

    useEffect(() => {

        if (deposit && feeForDeposit) {
            const amount = (deposit.amount as BigNumber).sub(feeForDeposit as BigNumber)
            setAmount(amount)
        }

    }, [deposit, feeForDeposit])

    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <div className='flex flex-col gap-8'>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-slate-900 uppercase"
                >
                    <div className='flex items-center justify-between'>
                        <span>Withdraw Deposit</span>
                        <button onClick={closeModal}><FaTimes /></button>
                    </div>
                </Dialog.Title>

                {status === "loading" && <LoadingView />}
                {status === "error" && <ErrorView error={error} withdraw={withdraw} />}
                {status === "success" && <SuccessView />}
                {status === "idle" &&
                    <>
                        <div>
                            {feeRate && feeRate && feeForDeposit && feeForDeposit > 0 && <div className='p-3 text-sm bg-amber-100 rounded border-0 border-amber-300 text-amber-900'>This deposit is less than {formatDuration(feeCliff)} old and is therefore subject to a {feeRate.toNumber()}% early withdrawl fee.</div>}
                        </div>

                        <div>
                            <table className='table-fixed w-full'>
                                <tbody>
                                    <tr>
                                        <td className={tdClass}>Deposit</td>
                                        <td className={tdClass}>{deposit && formatCommify(deposit.amount)}</td>
                                    </tr>
                                    <tr>
                                        <td className={tdClass}>Fee</td>
                                        <td className={tdClass}>{feeForDeposit && formatCommify(feeForDeposit)}</td>
                                    </tr>
                                    <tr>
                                        <td className={`border-y ${tdClass}`}>Expected Amount</td>
                                        <td className={`border-y ${tdClass}`}>{amount && formatCommify(amount)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button
                            type="button"
                            className="rounded-md border border-transparent bg-amber-100 px-6 py-3 text-amber-900 hover:bg-amber-200 w-full text-base font-semibold disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100"
                            onClick={withdraw}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <FaArrowAltCircleDown className="h-4" />
                                <span>Withdraw</span>
                            </div>
                        </button>
                    </>}
            </div>
        </DialogWrapper>
    )
}
