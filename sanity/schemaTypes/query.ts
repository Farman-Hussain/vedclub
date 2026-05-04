import { defineField, defineType } from 'sanity'

export const query = defineType({
  name: 'query',
  title: 'Patient Queries / Leads',
  type: 'document',
  fields:[
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'type', title: 'Query Type', type: 'string', options: { list: ['Treatment Booking', 'Medicine Inquiry', 'General Health Query'] } }),
    defineField({ name: 'message', title: 'Message', type: 'text' }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list:['New', 'Contacted', 'Resolved'] }, initialValue: 'New' }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime', initialValue: () => new Date().toISOString() })
  ]
})