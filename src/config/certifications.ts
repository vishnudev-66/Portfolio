export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialUrl?: string
  imageUrl?: string
}

// Placeholder certifications — replace with your real, earned credentials.
// Do not invent certificates you have not completed.

export const certifications: Certification[] = [
  {
    id: 'cert-placeholder-1',
    name: 'Add your certification name',
    issuer: 'Issuing organization',
    date: 'YYYY-MM',
    credentialUrl: undefined,
    imageUrl: undefined,
  },
  {
    id: 'cert-placeholder-2',
    name: 'Add your certification name',
    issuer: 'Issuing organization',
    date: 'YYYY-MM',
    credentialUrl: undefined,
    imageUrl: undefined,
  },
]
