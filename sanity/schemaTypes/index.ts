import { type SchemaTypeDefinition } from 'sanity'
import { herb } from './herb'
import { treatment } from './treatment'
import { author } from './author'
import { blog } from './blog'
import { news } from './news'
import { medicine } from './medicine'
import { query } from './query'
import { diet } from './diet' // <-- Added
import { disease } from './disease' // <-- Added

export const schema: { types: SchemaTypeDefinition[] } = {
  types:[herb, treatment, author, blog, news, medicine, query, diet, disease], 
}