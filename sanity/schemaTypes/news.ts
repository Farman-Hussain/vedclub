import { defineField, defineType } from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'Jobs & News',
  type: 'document',
  fields:[
    defineField({ name: 'title', title: 'News / Job Title', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'language', title: 'Language', type: 'string', options: { list:[{ title: 'English', value: 'en' }, { title: 'Hindi', value: 'hi' }], layout: 'radio' } }),
    defineField({ name: 'applyLink', title: 'Job Application / Source Link', type: 'url' }),
    defineField({ name: 'lastDate', title: 'Last Date to Apply / Exam Date', type: 'date' }),
    defineField({ name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'youtubeVideo', title: 'YouTube Video Link (Optional)', type: 'url' }),
    defineField({ name: 'content', title: 'Details (Rich Text)', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'faqs', title: 'Frequently Asked Questions', type: 'array', of:[{ type: 'object', fields:[{ name: 'question', title: 'Question', type: 'string' }, { name: 'answer', title: 'Answer', type: 'array', of:[{type: 'block'}] }] }] }),
    defineField({ name: 'references', title: 'Important Links / References', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'customSchema', title: 'Custom JSON-LD Schema', type: 'text' })
  ]
})