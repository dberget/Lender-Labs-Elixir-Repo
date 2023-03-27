defmodule SharkAttack.Analytics do
  def build_overview(c_id, collection_loans, "sharky") do
    fp = SharkAttack.FloorWorker.get_floor_price(c_id)

    offers =
      collection_loans
      |> Enum.filter(&(&1["state"] == "offered"))
      |> Enum.map(& &1["amountSol"])

    highestOffer =
      case offers do
        [] ->
          0

        _ ->
          Enum.max(offers, fn -> 0 end)
      end

    loans =
      collection_loans
      |> Enum.filter(&(&1["state"] == "taken"))
      |> Enum.sort_by(& &1["start"], :desc)

    last_24 =
      loans
      |> Enum.filter(fn l ->
        DateTime.diff(DateTime.utc_now(), DateTime.from_unix!(l["start"]), :second) < 86400
      end)
      |> length()

    underWater =
      case loans do
        [] ->
          {0, 0, 0}

        _ ->
          underWaterLoans = Enum.filter(loans, fn l -> l["amountSol"] + l["earnings"] > fp end)

          case underWaterLoans do
            [] ->
              {0, 0, 0}

            _ ->
              lengthUnderWaterLoans = length(underWaterLoans)

              sumUnderWater =
                Enum.map(underWaterLoans, &(&1["amountSol"] + &1["earnings"]))
                |> Enum.sum()

              {lengthUnderWaterLoans, sumUnderWater / lengthUnderWaterLoans, sumUnderWater}
          end
      end

    %{
      offers: length(offers),
      loans: length(loans),
      tvl: Enum.map(loans, fn l -> l["amountSol"] end) |> Enum.sum(),
      lastTaken: Enum.take(loans, 1),
      highestOffer: highestOffer,
      countUnderWater: elem(underWater, 0),
      averageUnderwater: elem(underWater, 1),
      totalValueUnderWater: elem(underWater, 2),
      last_24: last_24,
      ltf:
        unless highestOffer == 0 or fp == 0 do
          highestOffer / fp * 100
        end
    }
  end

  def build_overview(c_id, collection_loans, "citrus") do
    fp = SharkAttack.FloorWorker.get_floor_price(c_id)

    offers =
      collection_loans
      |> Enum.filter(&(&1["state"] == "waitingForBorrower"))
      |> Enum.map(& &1["amountSol"])

    highestOffer =
      case offers do
        [] ->
          0

        _ ->
          Enum.max(offers, fn -> 0 end)
      end

    loans =
      collection_loans
      |> Enum.filter(&(&1["state"] == "active"))
      |> Enum.sort_by(& &1["start"], :desc)

    last_24 =
      loans
      |> Enum.filter(fn l ->
        DateTime.diff(DateTime.utc_now(), DateTime.from_unix!(l["start"]), :second) < 86400
      end)
      |> length()

    underWater =
      case loans do
        [] ->
          {0, 0, 0}

        _ ->
          underWaterLoans = Enum.filter(loans, fn l -> l["amountSol"] + l["earnings"] > fp end)

          case underWaterLoans do
            [] ->
              {0, 0, 0}

            _ ->
              lengthUnderWaterLoans = length(underWaterLoans)

              sumUnderWater =
                Enum.map(underWaterLoans, &(&1["amountSol"] + &1["earnings"]))
                |> Enum.sum()

              {lengthUnderWaterLoans, sumUnderWater / lengthUnderWaterLoans, sumUnderWater}
          end
      end

    %{
      offers: length(offers),
      loans: length(loans),
      tvl: Enum.map(loans, fn l -> l["amountSol"] end) |> Enum.sum(),
      lastTaken: Enum.take(loans, 1),
      highestOffer: highestOffer,
      countUnderWater: elem(underWater, 0),
      totalValueUnderWater: elem(underWater, 2),
      averageUnderwater: elem(underWater, 1),
      last_24: last_24
    }
  end

  def build_overview(c_id, collection_loans, "frakt") do
    fp = SharkAttack.FloorWorker.get_floor_price(c_id)

    offers =
      collection_loans
      |> Enum.filter(&(&1["state"] == "waitingForBorrower"))
      |> Enum.map(& &1["amountSol"])

    highestOffer =
      case offers do
        [] ->
          0

        _ ->
          Enum.max(offers, fn -> 0 end)
      end

    loans =
      collection_loans
      |> Enum.filter(&(&1["state"] == "active"))
      |> Enum.sort_by(& &1["start"], :desc)

    last_24 =
      loans
      |> Enum.filter(fn l ->
        DateTime.diff(DateTime.utc_now(), DateTime.from_unix!(l["start"]), :second) < 86400
      end)
      |> length()

    underWater =
      case loans do
        [] ->
          {0, 0, 0}

        _ ->
          underWaterLoans = Enum.filter(loans, fn l -> l["amountSol"] + l["earnings"] > fp end)

          case underWaterLoans do
            [] ->
              {0, 0, 0}

            _ ->
              lengthUnderWaterLoans = length(underWaterLoans)

              sumUnderWater =
                Enum.map(underWaterLoans, &(&1["amountSol"] + &1["earnings"]))
                |> Enum.sum()

              {lengthUnderWaterLoans, sumUnderWater / lengthUnderWaterLoans, sumUnderWater}
          end
      end

    %{
      offers: length(offers),
      loans: length(loans),
      tvl: Enum.map(loans, fn l -> l["amountSol"] end) |> Enum.sum(),
      lastTaken: Enum.take(loans, 1),
      highestOffer: highestOffer,
      countUnderWater: elem(underWater, 0),
      totalValueUnderWater: elem(underWater, 2),
      averageUnderwater: elem(underWater, 1),
      last_24: last_24
    }
  end

  def average_underwater(
        %{
          countUnderWater: 0
        },
        %{
          countUnderWater: 0
        }
      ) do
    0
  end

  def average_underwater(
        %{
          averageUnderwater: averageUnderwater,
          countUnderWater: sharkyCount
        },
        %{countUnderWater: 0}
      )
      when sharkyCount > 0 do
    averageUnderwater
  end

  def average_underwater(
        %{countUnderWater: 0},
        %{
          averageUnderwater: averageUnderwater,
          countUnderWater: citrusCount
        }
      )
      when citrusCount > 0 do
    averageUnderwater
  end

  def average_underwater(
        %{totalValueUnderWater: sharky_tvlw, countUnderWater: sharkyCount},
        %{
          totalValueUnderWater: citrus_tvlw,
          countUnderWater: citrusCount
        }
      ) do
    (sharky_tvlw + citrus_tvlw) / (sharkyCount + citrusCount)
  end
end
