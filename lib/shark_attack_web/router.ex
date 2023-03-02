defmodule SharkAttackWeb.Router do
  use SharkAttackWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {SharkAttackWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SharkAttackWeb do
    pipe_through :api

    get "/", ApiController, :index
    get "/get_history", ApiController, :get_history
    get "/get_all_loans", ApiController, :get_all_loans
    get "/get_lender_loans", ApiController, :get_lender_loans
    get "/get_collection_offers", ApiController, :get_collection_offers

    get "/get_orderbooks", ApiController, :get_orderbooks
    post "/update_loan_earnings", ApiController, :update_loan_earnings
    get "/get_recent_loans", ApiController, :get_recent_loans

    get "/get_collection_list", ApiController, :get_collection_list
    get "/search_collections", ApiController, :search_collections
    get "/get_collection", ApiController, :get_collection
    get "/get_all_collection_loans", ApiController, :get_all_collection_loans

    post "/save_nft_image", ApiController, :save_nft_image
  end

  scope "/event", SharkAttackWeb do
    pipe_through :api

    post "/", EventController, :index
  end

  scope "/", SharkAttackWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", SharkAttackWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: SharkAttackWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
