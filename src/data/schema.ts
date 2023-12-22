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
 * Homepage
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
  banner_text?: string;

  /**
   * Banner Description — `string`
   *
   *
   */
  banner_description?: string;

  /**
   * Banner Image — `cloudinary.asset`
   *
   * Banner Image
   */
  banner_image?: CloudinaryAsset;

  /**
   * Human Description — `array`
   *
   *
   */
  human_description?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Gallery — `array`
   *
   *
   */
  gallery?: Array<SanityKeyedReference<Gallery>>;

  /**
   * Articles — `array`
   *
   *
   */
  articles?: Array<SanityKeyedReference<Article>>;

  /**
   * Experiences — `array`
   *
   *
   */
  experiences?: Array<SanityKeyedReference<WorkExperience>>;

  /**
   * Engagements — `array`
   *
   *
   */
  engagements?: Array<SanityKeyedReference<Engagement>>;

  /**
   * Notifications — `array`
   *
   *
   */
  notifications?: Array<SanityKeyedReference<Notification>>;
}

/**
 * Article
 *
 *
 */
export interface Article extends SanityDocument {
  _type: "article";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Url — `string`
   *
   *
   */
  url?: string;

  /**
   * Summary — `array`
   *
   *
   */
  summary?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Body — `array`
   *
   *
   */
  body?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Recommended — `array`
   *
   *
   */
  recommended?: Array<SanityKeyedReference<Article>>;

  /**
   * Is Travel Featured? — `boolean`
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

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Tags for item — `array`
   *
   *
   */
  tags?: Array<SanityKeyed<string>>;

  /**
   * Cover — `cloudinary.asset`
   *
   * Article cover image stored on Cloudinary
   */
  cover?: CloudinaryAsset;

  /**
   * Publish Date — `datetime`
   *
   *
   */
  publish_date?: string;
}

/**
 * Blog Category
 *
 *
 */
export interface BlogCategory extends SanityDocument {
  _type: "blogCategory";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Articles — `array`
   *
   *
   */
  articles?: Array<SanityKeyedReference<Article>>;
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
  notification_text?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Engagement
 *
 *
 */
export interface Engagement extends SanityDocument {
  _type: "engagement";

  /**
   * Name — `string`
   *
   * Enagagement Name
   */
  name?: string;

  /**
   * Summary — `array`
   *
   *
   */
  summary?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Event Name — `string`
   *
   * Event Name
   */
  event_name?: string;

  /**
   * Event Link — `string`
   *
   * Event Link
   */
  event_link?: string;

  /**
   * Type — `array`
   *
   * Engagement Type
   */
  type?: Array<SanityKeyed<"talk" | "podcast">>;

  /**
   * Thumbnail — `cloudinary.asset`
   *
   * Thumbnail
   */
  thumbnail?: CloudinaryAsset;
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
  upload_batch_name?: string;

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
  images?: Array<SanityKeyed<CloudinaryAsset>>;
}

/**
 * Company
 *
 *
 */
export interface Company extends SanityDocument {
  _type: "company";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Company Link — `string`
   *
   *
   */
  company_link?: string;

  /**
   * Thumbnail — `cloudinary.asset`
   *
   * Article cover image stored on Cloudinary
   */
  thumbnail?: CloudinaryAsset;

  /**
   * Review Type — `array`
   *
   * Review Type
   */
  review_type?: Array<SanityKeyed<"technical_writing_review" | "work_review">>;
}

/**
 * Work Experience
 *
 *
 */
export interface WorkExperience extends SanityDocument {
  _type: "work_experience";

  /**
   * Role — `string`
   *
   *
   */
  role?: string;

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Url — `string`
   *
   *
   */
  url?: string;

  /**
   * Summary — `string`
   *
   *
   */
  summary?: string;

  /**
   * Description — `array`
   *
   *
   */
  description?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Thumbnail — `cloudinary.asset`
   *
   * Company Thumbnail
   */
  thumbnail?: CloudinaryAsset;

  /**
   * Start Date — `datetime`
   *
   *
   */
  start_date?: string;

  /**
   * End Date — `datetime`
   *
   *
   */
  end_date?: string;
}

/**
 * Review
 *
 *
 */
export interface Review extends SanityDocument {
  _type: "review";

  /**
   * Name — `string`
   *
   * Reviewer Name
   */
  name?: string;

  /**
   * Reviewer Link — `string`
   *
   * Reviewer Profile Link
   */
  reviewer_link?: string;

  /**
   * Reviewer Role — `string`
   *
   * Reviewer Role
   */
  reviewer_role?: string;

  /**
   * Company Link — `string`
   *
   * Company Link
   */
  company_link?: string;

  /**
   * Company — `string`
   *
   *
   */
  company?: string;

  /**
   * Work Duration — `string`
   *
   * Period Worked Together
   */
  work_duration?: string;

  /**
   * Review Text — `array`
   *
   *
   */
  review_text?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Review Type — `array`
   *
   * Review Type
   */
  review_type?: Array<SanityKeyed<"technical_writing_review" | "work_review">>;

  /**
   * Thumbnail — `cloudinary.asset`
   *
   * Reviewer Thumbnail
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
  name?: string;
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type Documents =
  | Homepage
  | Article
  | BlogCategory
  | Notification
  | Engagement
  | Gallery
  | Company
  | WorkExperience
  | Review
  | CompaniesList;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type CloudinaryAsset = any;
