import Head from 'next/head';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
}

export default function SeoHead({
  title,
  description,
  canonicalUrl = '',
  ogImage = '/logo-main2.svg',
  ogType = 'website',
  keywords,
}: SeoHeadProps) {
  // Create full URLs
  const fullCanonicalUrl = canonicalUrl 
    ? canonicalUrl.startsWith('http') 
      ? canonicalUrl 
      : `https://barischarity.org${canonicalUrl}`
    : undefined;
  
  const fullOgImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `https://barischarity.org${ogImage}`;

  // Add site name to title if not already present
  const fullTitle = title.includes('Bariş Charity Foundation')
    ? title
    : `${title} | Bariş Charity Foundation`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:site_name" content="Bariş Charity Foundation" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImageUrl} />
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
    </Head>
  );
}