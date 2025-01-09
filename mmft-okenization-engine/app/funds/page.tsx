import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

const funds = [
  { id: 1, name: 'Global Money Market Fund', nav: 1.0025, aum: 1000000000 },
  { id: 2, name: 'US Treasury Fund', nav: 1.0015, aum: 750000000 },
  { id: 3, name: 'Euro Liquidity Fund', nav: 0.9995, aum: 500000000 },
]

export default function FundsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Available Funds</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funds.map((fund) => (
          <Card key={fund.id}>
            <CardHeader>
              <CardTitle>{fund.name}</CardTitle>
              <CardDescription>Fund ID: {fund.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>NAV: ${fund.nav.toFixed(4)}</p>
              <p>AUM: ${fund.aum.toLocaleString()}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/funds/${fund.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

