"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  name: z.string().min(1, "Fund name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  nav: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "NAV must be a positive number",
  }),
  initialShares: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number.isInteger(Number(val)), {
    message: "Initial shares must be a positive integer",
  }),
})

export default function CreateFundForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      nav: "",
      initialShares: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values)
    setIsSubmitting(false)
    toast({
      title: "Fund Created",
      description: `${values.name} has been created successfully.`,
    })
    router.push('/funds')
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Fund</CardTitle>
        <CardDescription>Enter the details for the new tokenized MMF</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fund Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter fund name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The official name of the Money Market Fund.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of the fund"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A short description of the fund's investment strategy and objectives.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nav"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial NAV</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter initial NAV" {...field} />
                  </FormControl>
                  <FormDescription>
                    The initial Net Asset Value per share of the fund.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initialShares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Shares</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter initial number of shares" {...field} />
                  </FormControl>
                  <FormDescription>
                    The initial number of shares for the fund.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Fund..." : "Create Fund"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


