import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Article
 *
 *
 */
export interface Article extends SanityDocument {
  _type: "article";

  /**
   * Article Title — `string`
   *
   *
   */
  title: string;

  /**
   * Article Summary — `array`
   *
   *
   */
  summary: Array<SanityKeyed<SanityBlock>>;

  /**
   * Article Tags — `array`
   *
   *
   */
  tags: Array<SanityKeyed<string>>;

  /**
   * External Article URL — `url`
   *
   *
   */
  url?: string;

  /**
   * Article Cover Image — `cloudinary.asset`
   *
   *
   */
  cover?: CloudinaryAsset;

  /**
   * Publish Date — `datetime`
   *
   *
   */
  publish_date?: string;

  /**
   * Travel Featured? — `boolean`
   *
   *
   */
  is_travel_featured?: boolean;

  /**
   * Is External? — `boolean`
   *
   *
   */
  is_external?: boolean;
}

/**
 * HomePage
 *
 *
 */
export interface Homepage extends SanityDocument {
  _type: "homepage";

  /**
   * Banner Text — `string`
   *
   *
   */
  banner_text: string;

  /**
   * Banner Description — `text`
   *
   *
   */
  banner_description: string;

  /**
   * Banner Image — `image`
   *
   *
   */
  banner_image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Human Description — `array`
   *
   *
   */
  human_description: Array<SanityKeyed<SanityBlock>>;

  /**
   * Human Image — `image`
   *
   *
   */
  human_image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Work Experience — `array`
   *
   *
   */
  experiences: Array<SanityKeyedReference<WorkExperience>>;

  /**
   * Gallery Images — `array`
   *
   *
   */
  gallery: Array<SanityKeyedReference<Gallery>>;

  /**
   * Notifications — `array`
   *
   *
   */
  notifications: Array<SanityKeyedReference<Notification>>;

  /**
   * Featured Articles — `array`
   *
   *
   */
  articles: Array<SanityKeyedReference<Article>>;

  /**
   * Featured Engagements — `array`
   *
   *
   */
  engagements: Array<SanityKeyedReference<Engagement>>;
}

/**
 * Notification
 *
 *
 */
export interface Notification extends SanityDocument {
  _type: "notification";

  /**
   * Used By — `string`
   *
   *
   */
  used_by?: string;

  /**
   * Notification Text — `array`
   *
   *
   */
  notification_text: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Work Experience
 *
 *
 */
export interface WorkExperience extends SanityDocument {
  _type: "work_experience";

  /**
   * Job Role — `string`
   *
   *
   */
  role: string;

  /**
   * Company Name — `string`
   *
   *
   */
  name: string;

  /**
   * Company Summary — `string`
   *
   *
   */
  summary: string;

  /**
   * Company URL — `url`
   *
   *
   */
  url: string;

  /**
   * Company Thumbnail — `cloudinary.asset`
   *
   *
   */
  thumbnail?: CloudinaryAsset;

  /**
   * Start Date — `datetime`
   *
   *
   */
  start_date: string;

  /**
   * End Date — `datetime`
   *
   *
   */
  end_date?: string;

  /**
   * Work Description — `array`
   *
   *
   */
  description: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Gallery
 *
 *
 */
export interface Gallery extends SanityDocument {
  _type: "gallery";

  /**
   * Upload Batch Name — `string`
   *
   *
   */
  upload_batch_name: string;

  /**
   * All Paired Image Alt texts (for hover) — `array`
   *
   *
   */
  all_alt_texts?: Array<SanityKeyed<string>>;

  /**
   * Images — `array`
   *
   *
   */
  images: Array<SanityKeyed<CloudinaryAsset>>;
}

/**
 * Review
 *
 *
 */
export interface Review extends SanityDocument {
  _type: "review";

  /**
   * Reviewer Name — `string`
   *
   *
   */
  name: string;

  /**
   * Reviewer Profile Link — `url`
   *
   *
   */
  reviewer_link?: string;

  /**
   * Reviewer Role — `string`
   *
   *
   */
  reviewer_role: string;

  /**
   * Company Link — `url`
   *
   *
   */
  company_link?: string;

  /**
   * Company Name — `string`
   *
   *
   */
  company: string;

  /**
   * Review Type — `array`
   *
   *
   */
  review_type: Array<SanityKeyed<string>>;

  /**
   * Review Text — `array`
   *
   *
   */
  review_text: Array<SanityKeyed<SanityBlock>>;

  /**
   * Period Worked Together — `string`
   *
   *
   */
  work_duration?: string;

  /**
   * Reviewer Thumbnail — `cloudinary.asset`
   *
   *
   */
  thumbnail?: CloudinaryAsset;
}

/**
 * Engagement
 *
 *
 */
export interface Engagement extends SanityDocument {
  _type: "engagement";

  /**
   * Engagement Name — `string`
   *
   *
   */
  name: string;

  /**
   * Event Name — `string`
   *
   *
   */
  event_name: string;

  /**
   * Event Link — `url`
   *
   *
   */
  event_link?: string;

  /**
   * Engagement Type — `array`
   *
   *
   */
  type: Array<SanityKeyed<string>>;

  /**
   * Talk Summary — `array`
   *
   *
   */
  summary: Array<SanityKeyed<SanityBlock>>;

  /**
   * Thumbnail — `cloudinary.asset`
   *
   *
   */
  thumbnail?: CloudinaryAsset;
}

/**
 * Companies List
 *
 *
 */
export interface CompaniesList extends SanityDocument {
  _type: "companies_list";

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Section To Place Companies — `array`
   *
   *
   */
  section_for: Array<SanityKeyed<string>>;

  /**
   * List of Companies — `array`
   *
   *
   */
  companies_list: Array<SanityKeyedReference<Company>>;
}

/**
 * Company
 *
 *
 */
export interface Company extends SanityDocument {
  _type: "company";

  /**
   * Company Name — `string`
   *
   *
   */
  name: string;

  /**
   * Company Profile Link — `url`
   *
   *
   */
  company_link: string;

  /**
   * Reviewer Thumbnail — `cloudinary.asset`
   *
   *
   */
  thumbnail?: CloudinaryAsset;

  /**
   * Review Type — `array`
   *
   *
   */
  review_type: Array<SanityKeyed<string>>;
}

export type Documents =
  | Article
  | Homepage
  | Notification
  | WorkExperience
  | Gallery
  | Review
  | Engagement
  | CompaniesList
  | Company;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type CloudinaryAsset = any;
