import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">MMF Tokenization</Link>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/funds">Funds</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/corporate-actions">Corporate Actions</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

