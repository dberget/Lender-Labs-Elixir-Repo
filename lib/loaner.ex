defmodule SharkAttack.Loaner do
  # strict: only offer loans at the target loan amount according to target LTF
  # best: Always offer loans above best active offer but below target LTF.
  # max: Always offer loans above best active offer regardless of target LTF.

  @loanPlan %{
    loan_style: "best",
    wallet_address: "BYyyoDn3LB6dNcc7MZmiyqoPmptccVjdW6jHD5j7M91W",
    target_collection: "AiYV1ZfNTNdcfyCsxQVGJUqdhHvfiMkkW1Dtif1RHf3o"
  }

  def calculate_loan(loanPlan \\ @loanPlan) do
    target_collection = loanPlan.target_collection
    available_balance = SharkAttack.get_solana_balance()

    collection =
      SharkAttack.build_collection_data()
      |> Enum.filter(fn x -> x["pubkey"] === target_collection end)
      |> hd

    loan = %{
      loan_amount: get_loan_amount(loanPlan.loan_style, collection),
      pubkey: collection["pubkey"],
      available_balance: available_balance
    }

    SharkAttack.SharkyApi.submit_offer(loanPlan.wallet_address, loan)
  end

  def get_loan_amount(loan_style, collection) do
    case loan_style do
      "strict" -> collection["target_loan_amount"]
      "best" -> take_smaller(collection["bestLoan"] + 0.01, collection["target_loan_amount"])
      "max" -> collection["bestLoan"] + 0.01
    end
    |> Float.round(2)
  end

  defp take_smaller(x, y) when x > y, do: y
  defp take_smaller(x, y) when x < y, do: x
end
