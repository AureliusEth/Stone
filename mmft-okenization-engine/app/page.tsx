import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to MMF Tokenization Platform</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Funds</CardTitle>
            <CardDescription>View and interact with your tokenized MMFs</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/funds">View Funds</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Corporate Actions</CardTitle>
            <CardDescription>Execute and manage corporate actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/corporate-actions">Manage Actions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

