import { defineField, defineType } from 'sanity'

export const medicine = defineType({
  name: 'medicine',
  title: 'Ayurvedic Medicines',
  type: 'document',
  fields:[
    defineField({ name: 'title', title: 'Medicine Name', type: 'string' }),
    defineField({ name: 'classicalReference', title: 'Classical Reference (e.g. Charaka Samhita)', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'language', title: 'Language', type: 'string', options: { list:[{ title: 'English', value: 'en' }, { title: 'Hindi', value: 'hi' }], layout: 'radio' } }),
    defineField({ name: 'author', title: 'Reviewed By / Doctor', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'images', title: 'Product Images', type: 'array', of:[{ type: 'image', options: { hotspot: true } }] }),
    
    // Quick Details
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'ingredients', title: 'Key Ingredients (Rich Text)', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'indications', title: 'Therapeutic Indications / Uses', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'dosage', title: 'Dosage & Anupana (How to take)', type: 'array', of:[{type: 'block'}] }),
    
    // Main Content
    defineField({ name: 'content', title: 'Detailed Content (Rich Text)', type: 'array', of:[{type: 'block'}] }),
    
    // Standard Blocks
    defineField({ name: 'youtubeVideo', title: 'YouTube Video Link', type: 'url' }),
    defineField({ name: 'faqs', title: 'Frequently Asked Questions', type: 'array', of:[{ type: 'object', fields:[{ name: 'question', type: 'string' }, { name: 'answer', type: 'array', of:[{type: 'block'}] }] }] }),
    defineField({ name: 'references', title: 'References', type: 'array', of:[{type: 'block'}] }),
    
    // E-commerce
    defineField({ name: 'storeLink', title: 'Ved Club Store Link', type: 'url' }),
    defineField({ name: 'amazonLink', title: 'Amazon Link', type: 'url' }),
    defineField({ name: 'blinkitLink', title: 'Blinkit Link', type: 'url' }),

    // SEO
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'customSchema', title: 'Custom JSON-LD Schema', type: 'text' })
  ]
})