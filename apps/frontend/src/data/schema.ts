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
   * Hero Pitch — `text`
   *
   * Short pitch under your name in the home hero. Falls back to the first paragraph of Banner Description.
   */
  hero_pitch?: string;

  /**
   * Banner Image — `cloudinary.asset`
   *
   * Banner Image
   */
  banner_image?: CloudinaryAsset;

  /**
   * Banner Image Alt Text — `string`
   *
   * Describes the portrait for screen readers. Also shown in the hero's "ALT" popover.
   */
  banner_image_alt?: string;

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
   * Projects — `array`
   *
   *
   */
  projects?: Array<SanityKeyedReference<Projects>>;

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
   * Seo Summary — `string`
   *
   *
   */
  seo_summary?: string;

  /**
   * Body — `array`
   *
   *
   */
  body?: Array<
    | SanityKeyed<SanityBlock>
    | SanityKeyed<CloudinaryAsset>
    | SanityKeyed<Youtube>
  >;

  /**
   * Gallery — `array`
   *
   * List of images to show
   */
  gallery?: Array<SanityKeyed<CloudinaryAsset>>;

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

  /**
   * Tag label — `string`
   *
   * Small label before the message. Leave empty for “New”.
   */
  tag_label?: string;

  /**
   * Button label — `string`
   *
   * Leave empty for “Read article →”.
   */
  cta_label?: string;

  /**
   * Button link — `url`
   *
   * Where the button (and pulling the banner down) goes. Site paths like /blog/… are fine. Leave empty to use the first link in the text; with no link at all there is no button.
   */
  cta_url?: string;

  /**
   * Show from — `datetime`
   *
   * Optional. Hidden before this time.
   */
  starts_at?: string;

  /**
   * Hide after — `datetime`
   *
   * Optional. Hidden from this time on.
   */
  ends_at?: string;
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
   * Teaser — `string`
   *
   * One-line summary shown in the home hero's "Recent" list. Falls back to the first sentence of Summary.
   */
  teaser?: string;

  /**
   * Event Date — `date`
   *
   * When the talk or podcast happened. Used to pick the latest talk for the home hero.
   */
  event_date?: string;

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
   * Company Name
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

/**
 * Vacation Preview
 *
 *
 */
export interface VacationPreview extends SanityDocument {
  _type: "vacation_preview";

  /**
   * Vacation Name — `string`
   *
   * Name of the vacation trip
   */
  vacation_name?: string;

  /**
   * Images — `array`
   *
   * List of images to show in carousel
   */
  images?: Array<SanityKeyed<CloudinaryAsset>>;

  /**
   * Vacation Article — `reference`
   *
   * Article written for this vacation
   */
  article?: SanityReference<Article>;
}

/**
 * Engineering Projects
 *
 *
 */
export interface Projects extends SanityDocument {
  _type: "projects";

  /**
   * Title — `string`
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
   * GitHub URL — `string`
   *
   *
   */
  github_url?: string;

  /**
   * Description — `array`
   *
   *
   */
  description?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Teaser — `string`
   *
   * One-line summary shown in the home hero's "Recent" list. Falls back to the first sentence of Description.
   */
  teaser?: string;

  /**
   * Project Tools — `array`
   *
   * List of tools or technologies used to develop project
   */
  project_tools?: Array<SanityKeyed<string>>;

  /**
   * Cover — `cloudinary.asset`
   *
   * Project cover image on Cloudinary
   */
  cover?: CloudinaryAsset;

  /**
   * Publish Date — `datetime`
   *
   *
   */
  publish_date?: string;
}

export type Youtube = {
  _type: "youtube";
  /**
   * YouTube video URL — `url`
   *
   *
   */
  url?: string;
};

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
  | CompaniesList
  | VacationPreview
  | Projects;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type CloudinaryAsset = any;
