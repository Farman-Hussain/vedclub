import { defineField, defineType } from 'sanity'

export const blog = defineType({
  name: 'blog',
  title: 'Blogs & Health Tips',
  type: 'document',
  fields:[
    defineField({ name: 'title', title: 'Article Title', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'language', title: 'Language', type: 'string', options: { list:[{ title: 'English', value: 'en' }, { title: 'Hindi', value: 'hi' }], layout: 'radio' } }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list:[{ title: 'General Blog', value: 'blog' }, { title: 'Health Tip', value: 'tip' }] } }),
    defineField({ name: 'author', title: 'Reviewed By / Author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'youtubeVideo', title: 'YouTube Video Link (Optional)', type: 'url', description: 'Paste the standard YouTube link here (e.g. https://www.youtube.com/watch?v=...)' }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime' }),
    defineField({ name: 'content', title: 'Main Content (Rich Text)', type: 'array', of:[{type: 'block'}, {type: 'image'}] }),
    defineField({ name: 'faqs', title: 'Frequently Asked Questions', type: 'array', of:[{ type: 'object', fields:[{ name: 'question', title: 'Question', type: 'string' }, { name: 'answer', title: 'Answer (Rich Text)', type: 'array', of:[{type: 'block'}] }] }] }),
    defineField({ name: 'references', title: 'Scientific References & Citations', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'customSchema', title: 'Custom JSON-LD Schema', type: 'text' })
  ]
})