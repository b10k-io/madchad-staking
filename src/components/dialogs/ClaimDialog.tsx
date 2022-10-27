import { Dialog } from '@headlessui/react'
import { IClaimDialog } from '../../types/dialogs'
import DialogWrapper from './DialogWrapper'
import { FaArrowAltCircleDown, FaCheckCircle, FaSpinner, FaSync, FaTimes } from "react-icons/fa"
import { TransactionError } from '@thirdweb-dev/sdk'
import { BigNumber } from 'ethers'
import { formatCommify } from '../../support/formatters'
import { useAddress, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { contractAddress } from '../../constants'
import ERC20Staking from "../../abi/ERC20Staking.json"

function DefaultView({ amount, claim }: { amount: BigNumber, claim: () => void }) {
    return (
        <div className="flex flex-col gap-4 items-center text-center mb-8">
            <h4 className="text-sm text-slate-400 uppercase">Step 1 of 1</h4>
            <FaArrowAltCircleDown className="h-6 w-6" />
            <h3 className="font-semibold uppercase text-slate-900">Claiming Rewards</h3>
            <h4 className="font-semibold uppercase text-slate-900">{formatCommify(amount)} BNB</h4>
            <button type="submit" className="text-xl font-semibold text-white py-3 px-4 bg-emerald-500 rounded-md hover:border-emerald-500 hover:bg-emerald-400 w-full" onClick={claim}>
                <div className="flex items-center justify-center gap-2">
                    <FaArrowAltCircleDown className="h-4" />
                    <span>Claim</span>
                </div>
            </button>
        </div>
    )
}

function LoadingView({ amount }: { amount: BigNumber }) {
    return (
        <div className="flex flex-col gap-4 items-center text-center mb-8">
            <h4 className="text-sm text-slate-400 uppercase">Step 1 of 1</h4>
            <FaSpinner className="animate-spin h-6 w-6" />
            <h3 className="font-semibold uppercase text-slate-900">Claiming Rewards</h3>
            <h4 className="font-semibold uppercase text-slate-900">{formatCommify(amount)} BNB</h4>
            <p className="text-slate-400">Confirm this transaction in your wallet</p>
        </div>
    )
}

function ErrorView({ error, claim }: { error: unknown, claim: () => void }) {
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
                onClick={claim}
            >
                <div className="flex items-center justify-center gap-2">
                    <FaSync className="h-4" />
                    <span>Try again</span>
                </div>
            </button>
        </div>
    )
}

function SuccessView({ amount }: { amount: BigNumber }) {
    return (
        <div className="flex flex-col gap-4 items-center text-center mb-8">
            <h4 className="text-sm text-slate-400 uppercase">Congratulations</h4>
            <FaCheckCircle className="text-emerald-500 h-6 w-6" />
            <h3 className="font-semibold uppercase text-emerld-900">You Claimed Rewards</h3>
            <h4 className="font-semibold uppercase text-slate-900">{formatCommify(amount)} BNB</h4>
            <p className="text-slate-400">Rewards have been transferred to your wallet.</p>
        </div>
    )
}

export default function ClaimDialog({ roundIndex, isOpen, openModal, closeModal }: IClaimDialog) {

    const address = useAddress()
    const { contract } = useContract(contractAddress, ERC20Staking.abi)
    const { data: ethUnclaimedForRoundByAddress } = useContractRead(contract, "ethUnclaimedForRoundByAddress", roundIndex, address);
    const { mutateAsync: claimForRound, status, error } = useContractWrite(contract, "claimForRound");

    async function claim() {
        await claimForRound([roundIndex])
    }

    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-slate-900 uppercase"
            >
                <div className='flex items-center justify-between'>
                    <span>Claim Rewards</span>
                    <button onClick={closeModal}><FaTimes /></button>
                </div>
            </Dialog.Title>
            <div className="mt-8">
                { status === "idle" && <DefaultView amount={ethUnclaimedForRoundByAddress} claim={claim} />}
                { status === "loading" && <LoadingView amount={ethUnclaimedForRoundByAddress} />}
                { status === "error" && <ErrorView error={error} claim={claim} />}
                { status === "success" && <SuccessView amount={ethUnclaimedForRoundByAddress} />}
            </div>
        </DialogWrapper>
    )
}
