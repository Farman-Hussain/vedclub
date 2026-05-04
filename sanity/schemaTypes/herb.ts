import { defineField, defineType } from 'sanity'

export const herb = defineType({
  name: 'herb',
  title: 'Herbs Library',
  type: 'document',
  fields:[
    defineField({ name: 'title', title: 'Herb Name', type: 'string' }),
    defineField({ name: 'botanicalName', title: 'Botanical Name', type: 'string' }),
    defineField({ name: 'englishName', title: 'English Name (e.g. Indian Ginseng)', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } }),
    
    // Connects this herb to an Author/Doctor
    defineField({ name: 'author', title: 'Reviewed By / Author', type: 'reference', to: [{ type: 'author' }] }),
    
    // Multiple Images Support
    defineField({ 
      name: 'images', 
      title: 'Herb Images', 
      type: 'array', 
      of:[{ type: 'image', options: { hotspot: true } }] 
    }),
    
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: { list:[{ title: 'English', value: 'en' }, { title: 'Hindi', value: 'hi' }], layout: 'radio' }
    }),

    // RICH TEXT EDITORS
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'array', of: [{type: 'block'}] }),
    
    // 3-COLUMN PROPERTIES
    defineField({
      name: 'properties',
      title: 'Ayurvedic Properties',
      type: 'object',
      fields:[
        { name: 'rasa', title: 'Rasa (Taste)', type: 'string' },
        { name: 'rasaMeaning', title: 'Rasa Meaning', type: 'string' },
        { name: 'guna', title: 'Guna (Quality)', type: 'string' },
        { name: 'gunaMeaning', title: 'Guna Meaning', type: 'string' },
        { name: 'virya', title: 'Virya (Potency)', type: 'string' },
        { name: 'viryaMeaning', title: 'Virya Meaning', type: 'string' },
        { name: 'vipaka', title: 'Vipaka (Post-Digestive)', type: 'string' },
        { name: 'vipakaMeaning', title: 'Vipaka Meaning', type: 'string' },
        { name: 'dosha', title: 'Dosha Effect', type: 'string' },
        { name: 'doshaMeaning', title: 'Dosha Meaning', type: 'string' },
      ]
    }),

    defineField({
      name: 'benefits',
      title: 'Top Health Benefits',
      type: 'array',
      of:[
        {
          type: 'object',
          fields:[
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'description', title: 'Description (Rich Text)', type: 'array', of:[{type: 'block'}] }
          ]
        }
      ]
    }),

    defineField({ name: 'howToConsume', title: 'How to Consume (Rich Text)', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'sideEffects', title: 'Side Effects / Caution (Rich Text)', type: 'array', of: [{type: 'block'}] }),
    
    // FAQ SECTION
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of:[
        {
          type: 'object',
          fields:[
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer (Rich Text)', type: 'array', of:[{type: 'block'}] }
          ]
        }
      ]
    }), // <--- THIS WAS THE MISSING COMMA!
// E-COMMERCE / BUY LINKS
    defineField({ 
      name: 'storeLink', 
      title: 'Ved Club Store Link (Optional)', 
      type: 'url' 
    }),
    defineField({ 
      name: 'amazonLink', 
      title: 'Amazon Link (Optional)', 
      type: 'url' 
    }),
    defineField({ 
      name: 'blinkitLink', 
      title: 'Blinkit Link (Optional)', 
      type: 'url' 
    }),
    // 1. EXTRA FLEXIBLE CONTENT SECTION
    defineField({ 
      name: 'additionalContent', 
      title: 'Additional Content (Flexible Text/Formatting)', 
      type: 'array', 
      of: [{type: 'block'}] 
    }),

    // 2. REFERENCES & CITATIONS
    defineField({ 
      name: 'references', 
      title: 'Scientific References & Citations', 
      type: 'array', 
      of:[{type: 'block'}] 
    }),

    // 3. SEO & META DETAILS
    defineField({ 
      name: 'seoTitle', 
      title: 'SEO Meta Title', 
      type: 'string',
      description: 'The title that appears on Google Search (Usually 50-60 characters)'
    }),
    defineField({ 
      name: 'seoDescription', 
      title: 'SEO Meta Description', 
      type: 'text',
      description: 'The short description below the title on Google Search'
    }),

    // 4. CUSTOM JSON-LD SCHEMA
    defineField({ 
      name: 'customSchema', 
      title: 'Custom JSON-LD Schema', 
      type: 'text',
      description: 'Paste your raw JSON-LD code here for advanced Google Rich Snippets'
    })
  ],
})