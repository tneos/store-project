"use client";
import {useState} from "react";
import SelectProductAmount from "../single-product/SelectProductAmount";
import {Mode} from "../single-product/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import {SubmitButton} from "../form/Buttons";
import {removeCartItemAction, updateCartItemAction} from "@/utils/actions";
import {useToast} from "../ui/use-toast";

function ThirdColumn({id, quantity}: {id: string; quantity: number}) {
  const [amount, setAmount] = useState(quantity);
  const handleAmountChange = async (value: number) => {
    setAmount(value);
  };
  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={false}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton size="sm" className="mt-4" text="remove" />
      </FormContainer>
    </div>
  );
}
export default ThirdColumn;
