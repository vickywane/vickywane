interface MetadataProps {
  title: string
  description?: string
}

export const generateMetadata = async ({ title, description } : MetadataProps) => ({
  title: `Victory Nwani | ${title}`,
  description,
})
