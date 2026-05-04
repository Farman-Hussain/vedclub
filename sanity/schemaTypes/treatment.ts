import { defineField, defineType } from 'sanity'

export const treatment = defineType({
  name: 'treatment',
  title: 'Procedures & Treatments',
  type: 'document',
  fields:[
    defineField({ name: 'title', title: 'Procedure Name (e.g. Shirodhara)', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } }),
    
    // Connects to Doctor/Author
    defineField({ name: 'author', title: 'Reviewed By / Doctor', type: 'reference', to: [{ type: 'author' }] }),
    
    // Multiple Images Slider
    defineField({ name: 'images', title: 'Procedure Images', type: 'array', of:[{ type: 'image', options: { hotspot: true } }] }),
    
    defineField({ name: 'language', title: 'Language', type: 'string', options: { list:[{ title: 'English', value: 'en' }, { title: 'Hindi', value: 'hi' }], layout: 'radio' } }),
    defineField({ name: 'duration', title: 'Average Duration (e.g. 45-60 Mins)', type: 'string' }),
    
    // RICH TEXT FIELDS
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text' }),
    defineField({ name: 'overview', title: 'Overview / What is it? (Rich Text)', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'benefits', title: 'Key Benefits (Rich Text)', type: 'array', of: [{type: 'block'}] }),
    
    defineField({
      name: 'steps',
      title: 'Procedure Steps',
      type: 'array',
      of:[{
        type: 'object',
        fields:[
          { name: 'stepName', title: 'Step Name (e.g. Purvakarma)', type: 'string' },
          { name: 'description', title: 'Description (Rich Text)', type: 'array', of: [{type: 'block'}] }
        ]
      }]
    }),
    
    defineField({ name: 'whoIsItFor', title: 'Indications (Who needs this?) - Rich Text', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'contraindications', title: 'Contraindications (Avoid if) - Rich Text', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'faqs', title: 'Frequently Asked Questions', type: 'array', of:[{ type: 'object', fields:[{ name: 'question', title: 'Question', type: 'string' }, { name: 'answer', title: 'Answer', type: 'array', of:[{type: 'block'}] }] }] }),
    
    // ... inside sanity/schemaTypes/treatment.ts ...

    defineField({ name: 'consultationLink', title: 'Book Consultation Link (Optional)', type: 'url' }),
    defineField({ name: 'additionalContentHeading', title: 'Additional Content Heading (e.g., Scientific View)', type: 'string' }),
    defineField({ name: 'additionalContent', title: 'Additional Content (Rich Text)', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'summary', title: 'Conclusion / Summary', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'references', title: 'Scientific References', type: 'array', of: [{type: 'block'}] }),

    // (Your SEO fields should be right below this!)
    // SEO
    defineField({ name: 'seoTitle', title: 'SEO Meta Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Meta Description', type: 'text' }),
    defineField({ name: 'customSchema', title: 'Custom JSON-LD Schema', type: 'text' })
  ],
})