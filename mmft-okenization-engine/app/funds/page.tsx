import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
//import { getFunds } from '@/lib/api'

export default async function FundsPage() {
  //const funds = await getFunds();
  const funds = [
  { id: 1, name: 'Global Money Market Fund', nav: 1.0025, initialShares: 1000000000, description: 'A diversified global money market fund' },
  { id: 2, name: 'US Treasury Fund', nav: 1.0015, initialShares: 750000000, description: 'Invests primarily in US Treasury securities' },
  { id: 3, name: 'Euro Liquidity Fund', nav: 0.9995, initialShares: 500000000, description: 'Focuses on Euro-denominated money market instruments' },
];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Available Funds</h1>
        <Button asChild>
          <Link href="/funds/create">Create New Fund</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funds.map((fund) => (
          <Card key={fund.id} className="flex flex-col h-[300px]">
            <CardHeader>
              <CardTitle className="text-xl">{fund.name}</CardTitle>
              <CardDescription>Fund ID: {fund.id}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>NAV: ${fund.nav.toFixed(4)}</p>
              <p>Initial Shares: {fund.initialShares.toLocaleString()}</p>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{fund.description}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href={`/funds/${fund.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


