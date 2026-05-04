import { defineField, defineType } from 'sanity'

export const disease = defineType({
  name: 'disease',
  title: 'Diseases & Conditions',
  type: 'document',
  fields:[
    defineField({ name: 'title', title: 'Disease Name', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'language', title: 'Language', type: 'string', options: { list:[{ title: 'English', value: 'en' }, { title: 'Hindi', value: 'hi' }] } }),
    defineField({ name: 'author', title: 'Reviewed By', type: 'reference', to:[{ type: 'author' }] }),
    defineField({ name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text' }),
    
    defineField({ name: 'overview', title: 'Overview & Modern View', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'symptoms', title: 'Symptoms (Rich Text)', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'causes', title: 'Causes & Risk Factors', type: 'array', of: [{type: 'block'}] }),
    
    defineField({ name: 'ayurvedicPerspective', title: 'Ayurvedic Perspective (Dosha, Dhatu)', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'treatments', title: 'Ayurvedic Treatments & Herbs', type: 'array', of: [{type: 'block'}] }),
    defineField({ name: 'homeRemedies', title: 'Home Remedies', type: 'array', of:[{type: 'block'}] }),
    defineField({ name: 'dietLifestyle', title: 'Diet & Lifestyle (Ahara-Vihara)', type: 'array', of: [{type: 'block'}] }),

    // 🔥 NEW: CUSTOMIZABLE ADDITIONAL SECTION
    defineField({ name: 'additionalSectionHeading', title: 'Additional Section Heading (Optional)', type: 'string', description: 'Example: Yoga Asanas for this Disease' }),
    defineField({ name: 'additionalSectionContent', title: 'Additional Section Content', type: 'array', of:[{type: 'block'}], description: 'If left empty, this section will automatically hide on the website.' }),

    // 🔥 NEW: CONCLUSION
    defineField({ name: 'conclusion', title: 'Conclusion', type: 'array', of:[{type: 'block'}] }),

    defineField({ name: 'faqs', title: 'FAQs', type: 'array', of:[{ type: 'object', fields:[{ name: 'question', type: 'string' }, { name: 'answer', type: 'array', of:[{type: 'block'}] }] }] }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'customSchema', title: 'Custom JSON-LD Schema', type: 'text' })
  ]
})