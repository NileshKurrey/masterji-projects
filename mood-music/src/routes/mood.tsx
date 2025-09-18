import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mood')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/mood"!</div>
}
