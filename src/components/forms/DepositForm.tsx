import { useForm, SubmitHandler } from "react-hook-form";
import { FaArrowAltCircleUp } from "react-icons/fa"

type Inputs = {
    amount: string,
};

export default function DepositForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  function setMax() {}

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
            <label>Amount</label>
            <span>Balance: 1,000,000</span>
        </div>

        <div className="flex">
            <input defaultValue="0" {...register("amount", { required: true })} className="grow outline-0 border-2 border-r-0 border-emerald-500 text-3xl py-1 px-2 rounded-l-md text-slate-600" />
            <button className="text-xl font-semibold text-white py-1 px-4 bg-emerald-500 rounded-r-md hover:border-emerald-500 hover:bg-emerald-400" onClick={() => setMax()} type="button">MAX</button>
        </div>

        {errors.amount && <span>This field is required</span>}

        <button type="submit" className="text-xl font-semibold text-white py-3 px-4 bg-emerald-500 rounded-md hover:border-emerald-500 hover:bg-emerald-400">
            <div className="flex items-center justify-center gap-2">
                <FaArrowAltCircleUp className="h-4" />
                <span>Deposit</span>
            </div>
        </button>
      
    </form>
  );
}