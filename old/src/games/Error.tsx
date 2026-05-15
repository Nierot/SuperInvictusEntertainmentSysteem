import { useGame } from '../hooks/useGame.ts'

export function NLAlert() {
  const state = useGame()

  return (
    <div className="SiesGame">
      <div className="NLAlert">
        <h2>NL Alert</h2>
        <div>
          <p>Current Game: {state.getCurrentGame()}</p>
          <p>Time: {state.getTimeHumanReadable()}</p>
          <p>Players: {state.getPlayers().length}</p>
          <div>
            {state.getPlayers().map(player => (
              <div key={player.pid}>
                {player.name} - Score: {player.score}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

