import { defineField, defineType } from 'sanity'

export const diet = defineType({
  name: 'diet',
  title: 'Diet Plans',
  type: 'document',
  fields:[
    defineField({ name: 'title', title: 'Diet Plan Name', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'language', title: 'Language', type: 'string', options: { list:[{ title: 'English', value: 'en' }, { title: 'Hindi', value: 'hi' }] } }),
    defineField({ name: 'author', title: 'Reviewed By', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text' }),
    
    defineField({ name: 'overview', title: 'Overview (Rich Text)', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'foodsToEat', title: 'Foods to Eat (Rich Text)', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'foodsToAvoid', title: 'Foods to Avoid (Rich Text)', type: 'array', of: [{type: 'block'}] }),
    
    // 7-DAY DIET PLAN BUILDER
    defineField({
      name: 'weeklyPlan',
      title: '7-Day Diet Plan',
      type: 'array',
      of: [{
        type: 'object',
        fields:[
          { name: 'day', title: 'Day Name (e.g. Day 1 / Monday)', type: 'string' },
          { name: 'earlyMorning', title: 'Early Morning (e.g. Warm water with lemon)', type: 'string' },
          { name: 'breakfast', title: 'Breakfast', type: 'string' },
          { name: 'midMorning', title: 'Mid-Morning Snack', type: 'string' },
          { name: 'lunch', title: 'Lunch', type: 'string' },
          { name: 'evening', title: 'Evening Snack', type: 'string' },
          { name: 'dinner', title: 'Dinner', type: 'string' }
        ]
      }]
    }),

    defineField({ name: 'faqs', title: 'FAQs', type: 'array', of:[{ type: 'object', fields:[{ name: 'question', type: 'string' }, { name: 'answer', type: 'array', of:[{type: 'block'}] }] }] }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'customSchema', title: 'Custom JSON-LD Schema', type: 'text' })
  ]
})