"use client"

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  fundId: z.string().min(1, "Fund ID is required"),
  actionType: z.string().min(1, "Action type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  amount: z.string().optional().refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
    message: "Amount must be a positive number",
  }),
})

export default function CorporateActionsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fundId: "",
      actionType: "",
      description: "",
      amount: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values)
    setIsSubmitting(false)
    toast({
      title: "Corporate Action Submitted",
      description: `Your ${values.actionType} action for Fund ID ${values.fundId} has been submitted successfully.`,
    })
    form.reset()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Corporate Actions</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Execute Corporate Action</CardTitle>
          <CardDescription>Submit a new corporate action for a fund</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fundId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fund ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Fund ID" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the ID of the fund for this corporate action.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="actionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an action type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dividend">Dividend Distribution</SelectItem>
                        <SelectItem value="split">Stock Split</SelectItem>
                        <SelectItem value="merge">Fund Merge</SelectItem>
                        <SelectItem value="fee_change">Fee Structure Change</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the type of corporate action to execute.
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
                        placeholder="Provide details about the corporate action"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the corporate action in detail.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (if applicable)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the amount for the corporate action, if applicable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Submit Corporate Action"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

