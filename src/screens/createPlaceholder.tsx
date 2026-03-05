import { PlaceholderScreen } from '../components/ui/PlaceholderScreen'

export function createPlaceholderScreen(title: string, description: string) {
  return function Screen() {
    return <PlaceholderScreen title={title} description={description} />
  }
}
