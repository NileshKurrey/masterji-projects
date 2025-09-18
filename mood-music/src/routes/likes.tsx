import { createFileRoute } from '@tanstack/react-router'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
export const Route = createFileRoute('/likes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='p-16 flex flex-col items-start justify-start min-h-screen bg-gray-50'>
    <h1 className="text-6xl font-bold mt-16">Your Liked Songs</h1>
    <p className='text-gray-500 mt-2'>Playlist: 100 songs</p>
    <div className='mt-10 w-full'>
      {/* table of liked songs */}
      <Table >
        <TableHeader>
          <TableRow>
          
          </TableRow>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Album</TableHead>
            <TableHead>Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((track) => (
            <TableRow key={track} className="hover:bg-gray-100 cursor-pointer">
              <TableCell>{track}</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date Added</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
}
