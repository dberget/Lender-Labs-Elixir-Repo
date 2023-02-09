# SharkAttack

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Deployment

To build and deploy a release:

```
./deploy.sh
```

### Production commands

Add or edit an environment variable to be read in `runtime.exs`:
```bash
systemctl edit lenderlabs.service
# edit config, then:
systemctl restart lenderlabs.service
```

Tail the logs in production:
```bash
journalctl -u lenderlabs.service -b -f
```

Restart the prod server:
```bash
systemctl restart lenderlabs.service
```