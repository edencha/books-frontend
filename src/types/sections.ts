import * as BookApi from 'src/types/book';

export enum DisplayType {
  HomeQuickMenu = 'HomeQuickMenu',
  Page = 'Page',
  HomeCarouselBanner = 'HomeCarouselBanner',
  HotRelease = 'HotRelease',
  TodayRecommendation = 'TodayRecommendation', // 오늘 리디의 발견
  BestSeller = 'BestSeller',
  RecommendedBook = 'RecommendedBook', // 이 책 어때요
  HomeMdSelection = 'HomeMdSelection',
  ReadingBooksRanking = 'ReadingBooksRanking',
  HomeEventBanner = 'HomeEventBanner',
  UserPreferredBestseller = 'UserPreferredBestseller',
  TodayNewBook = 'TodayNewBook', // 최신 단행본
  NewSerialBook = 'NewSerialBook', // 최신 연재
  Keywordfinder = 'Keywordfinder',
  WaitFree = 'WaitFree', // 리디 기다리면 무료
  AiRecommendation = 'AiRecommendation', // AI 추천
}

interface BaseResult {
  slug: string;
  type: DisplayType;
  title: string;
  total: number;
}

export type SectionResult =
  | QuickMenu
  | TopBanner
  | EventBanner
  | BestSeller
  | ReadingRanking
  | MdSelection;

export interface SectionExtra {
  detail_link?: string;
  genre?: string;
  options?: string;
  period?: string;
  type?: string;
  is_placeholder?: string;
}

export interface Section extends BaseResult {
  items?: SectionResult[];
  item_metadata: {};
  extra: SectionExtra;
}

export interface Page extends BaseResult {
  branches: Section[];
}

export interface BestSeller {
  detail: BookApi.Book | null;
  b_id: string;
  period: string;
  options: [];
  rank: number;
  rating: StarRating;
}

export interface StarRating {
  total_rating_count: number;
  buyer_rating_count: number;
  buyer_rating_score: number;
}

export interface ReadingRanking {
  detail: BookApi.Book | null;
  b_id: string;
  type: string;
  rating: StarRating;
}

export interface HotRelease {
  detail: BookApi.Book | null;
  b_id: string;
  type: string;
  order: number;
  sentence: string;
  rating: StarRating;
}
export type TodayRecommendation = HotRelease;

export interface TopBanner {
  id: number;
  title: string;
  main_image_url: string;
  landing_url: string;
  bg_color: string;
  order: number;
  is_visible: boolean;
  is_badge_available: boolean;
}

export interface QuickMenu {
  id: number;
  name: string;
  url: string;
  icon: string;
  bg_color: string;
  order: number;
}

export interface EventBanner {
  id: number;
  title: string;
  sort_order: number;
  image_url: string;
  url: string;
  badge: string;
}

export interface MdBook {
  detail: BookApi.Book | null;
  b_id: string;
  type: string;
  rating: StarRating;
}

export interface MdSelection {
  id: number;
  title: string;
  order: number;
  category_id?: number;
  books: MdBook[];
}

export type BookItem =
  | MdBook
  | TodayRecommendation
  | HotRelease
  | ReadingRanking
  | BestSeller;
