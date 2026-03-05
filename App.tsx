import { AppProviders } from './src/core/AppProviders'
import { ThemedStatusBar } from './src/core/ThemedStatusBar'
import { RootNavigator } from './src/navigation/RootNavigator'

export default function App() {
  return (
    <AppProviders>
      <ThemedStatusBar />
      <RootNavigator />
    </AppProviders>
  )
}
