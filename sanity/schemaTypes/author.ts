import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Doctors & Authors',
  type: 'document',
  fields:[
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'image', title: 'Profile Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'specialty', title: 'Specialty (e.g. BAMS, MD)', type: 'string' }),
    defineField({ name: 'bio', title: 'Short Bio', type: 'text' }),
    defineField({ name: 'call', title: 'Call Number (with +91)', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (with +91)', type: 'string' }),
    
    // 🔥 NEW CONSULTATION LINK
    defineField({ name: 'consultationLink', title: 'Book Consultation Link (Optional)', type: 'url' }),
    
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
  ]
})